const mongoose = require("mongoose");
const Product = require("../models/Product");

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const httpError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const ALLOWED_UPDATE_FIELDS = ["name", "sku", "category", "price", "quantity", "reorderLevel", "supplier"];

const pick = (body) =>
  ALLOWED_UPDATE_FIELDS.reduce((acc, key) => {
    if (body[key] !== undefined) acc[key] = body[key];
    return acc;
  }, {});

// POST /api/products
exports.createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(pick(req.body));
  res.status(201).json(product);
});

// GET /api/products?category=&minPrice=&maxPrice=&search=&lowStock=true&sort=-price&page=1&limit=10
exports.getProducts = asyncHandler(async (req, res) => {
  const { category, minPrice, maxPrice, search, lowStock, sort } = req.query;
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);

  const filter = {};
  if (category) filter.category = new RegExp(`^${escapeRegex(category)}$`, "i");
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
  }
  if (search) {
    filter.$or = [
      { name: new RegExp(escapeRegex(search), "i") },
      { sku: new RegExp(escapeRegex(search), "i") },
    ];
  }
  if (lowStock === "true") filter.$expr = { $lte: ["$quantity", "$reorderLevel"] };

  // sort=-price,name  ->  "-price name"; restrict to known fields
  const sortFields = (sort || "-createdAt")
    .split(",")
    .map((f) => f.trim())
    .filter((f) => [...ALLOWED_UPDATE_FIELDS, "createdAt", "updatedAt"].includes(f.replace(/^-/, "")));
  const sortBy = sortFields.length ? sortFields.join(" ") : "-createdAt";

  const [total, products] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter)
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit),
  ]);

  res.json({
    total,
    page,
    totalPages: Math.ceil(total / limit),
    count: products.length,
    products,
  });
});

// GET /api/products/:id
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw httpError(404, "Product not found");
  res.json(product);
});

// PUT /api/products/:id
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, pick(req.body), {
    new: true,
    runValidators: true,
  });
  if (!product) throw httpError(404, "Product not found");
  res.json(product);
});

// PATCH /api/products/:id/stock   body: { "change": 10 } (restock) or { "change": -3 } (sale)
exports.adjustStock = asyncHandler(async (req, res) => {
  const change = req.body.change;
  if (typeof change !== "number" || !Number.isInteger(change) || change === 0) {
    throw httpError(400, "'change' must be a non-zero integer (positive = restock, negative = sale)");
  }

  // Atomic update: for a sale, the filter guarantees stock never goes below zero
  const filter = { _id: req.params.id };
  if (change < 0) filter.quantity = { $gte: -change };

  const product = await Product.findOneAndUpdate(
    filter,
    { $inc: { quantity: change } },
    { new: true, runValidators: true }
  );

  if (!product) {
    const exists = await Product.exists({ _id: req.params.id });
    if (!exists) throw httpError(404, "Product not found");
    throw httpError(400, "Insufficient stock for this sale");
  }

  res.json({ message: "Stock updated", product });
});

// DELETE /api/products/:id
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw httpError(404, "Product not found");
  res.json({ message: "Product deleted", id: product.id });
});

// GET /api/products/low-stock   (quantity <= reorderLevel) - aggregation
exports.getLowStock = asyncHandler(async (req, res) => {
  const lowStockItems = await Product.aggregate([
    { $match: { $expr: { $lte: ["$quantity", "$reorderLevel"] } } },
    { $addFields: { stockValue: { $multiply: ["$price", "$quantity"] }, id: { $toString: "$_id" } } },
    { $sort: { quantity: 1 } },
  ]);
  res.json({ count: lowStockItems.length, lowStockItems });
});

// GET /api/products/summary   category-wise inventory summary - aggregation
exports.getSummary = asyncHandler(async (req, res) => {
  const summary = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        totalItems: { $sum: 1 },
        totalQuantity: { $sum: "$quantity" },
        totalStockValue: { $sum: { $multiply: ["$price", "$quantity"] } },
        avgPrice: { $avg: "$price" },
      },
    },
    { $addFields: { avgPrice: { $round: ["$avgPrice", 2] } } },
    { $sort: { totalStockValue: -1 } },
  ]);
  res.json({ categories: summary.length, summary });
});

function escapeRegex(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// kept for ObjectId checks elsewhere if needed
exports._isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
