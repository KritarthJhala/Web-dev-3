require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  { name: "Study Table", sku: "FURN-TB-812", category: "Furniture", price: 3999, quantity: 2, reorderLevel: 4, supplier: "IKEA India" },
  { name: "Office Chair", sku: "FURN-CH-101", category: "Furniture", price: 5499, quantity: 15, reorderLevel: 5, supplier: "Godrej Interio" },
  { name: "Gel Pen Pack of 15", sku: "STNY-PN-713", category: "Stationery", price: 120, quantity: 40, reorderLevel: 20, supplier: "Cello Pens" },
  { name: "A4 Notebook", sku: "STNY-NB-220", category: "Stationery", price: 60, quantity: 8, reorderLevel: 25, supplier: "Classmate" },
  { name: "Wireless Mouse", sku: "ELEC-MS-301", category: "Electronics", price: 799, quantity: 30, reorderLevel: 10, supplier: "Logitech" },
  { name: "Laptop 15 inch", sku: "ELEC-LP-450", category: "Electronics", price: 45999, quantity: 5, reorderLevel: 3, supplier: "Lenovo" },
  { name: "Bluetooth Speaker", sku: "ELEC-SP-512", category: "Electronics", price: 2499, quantity: 9, reorderLevel: 10, supplier: "boAt" },
  { name: "USB-C Cable", sku: "ELEC-CB-009", category: "Electronics", price: 299, quantity: 52, reorderLevel: 20, supplier: "Anker" },
  { name: "Cotton T-Shirt", sku: "APRL-TS-110", category: "Apparel", price: 499, quantity: 60, reorderLevel: 20, supplier: "Levis" },
  { name: "Denim Jeans", sku: "APRL-JN-221", category: "Apparel", price: 2299, quantity: 18, reorderLevel: 10, supplier: "Levis" },
  { name: "Basmati Rice 5kg", sku: "GROC-RC-501", category: "Grocery", price: 650, quantity: 3, reorderLevel: 15, supplier: "India Gate" },
  { name: "Olive Oil 1L", sku: "GROC-OL-502", category: "Grocery", price: 899, quantity: 25, reorderLevel: 10, supplier: "Figaro" },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);
  } catch (err) {
    console.error(err.message);
  } finally {
    await mongoose.disconnect();
  }
})();
