# Smart Utility Toolkit

Lab Assignment 1 — Web Dev III (Node.js & Express Backend), Unit 1.
A collection of small Node.js utilities built entirely with **core modules**
(`process`, `http`, `fs`, `crypto`) — no external packages or frameworks.

## Project Structure

```
smart-utility-toolkit/
├── calculator.js        # CLI calculator (process.argv)
├── app.js                # Demonstrates custom module reuse
├── server.js             # HTTP server with routing (http module)
├── fileManager.js        # File CRUD operations (fs module)
├── dice.js                # Random dice generator (crypto module)
├── test.txt               # Sample file used by fileManager.js
├── modules/
│   ├── isEven.js          # Custom module: checks even/odd
│   └── logger.js          # Custom module: timestamped console logs
└── README.md
```

## 1. CLI Calculator

```bash
node calculator.js add 10 5      # Result: 15
node calculator.js sub 10 5      # Result: 5
node calculator.js mul 10 5      # Result: 50
node calculator.js div 10 5      # Result: 2
node calculator.js div 10 0      # Error: Division by zero is not allowed
```

## 2. Custom Modules

- `modules/isEven.js` exports a function that checks if a number is even.
- `modules/logger.js` exports timestamped logging helpers (`info`, `success`, `error`).

Both are imported and reused across `calculator.js`, `app.js`, `server.js`,
`fileManager.js`, and `dice.js` via `require()`.

Run the reuse demo:

```bash
node app.js
```

## 3. HTTP Server

```bash
node server.js
```

Then visit in a browser or Postman:

| Route      | Response             |
|------------|-----------------------|
| `/`        | Welcome to Node Server |
| `/about`   | About Page             |
| `/contact` | Contact Page           |
| anything else | 404 Error: Page Not Found |

## 4. File Manager (CRUD)

```bash
node fileManager.js
```

Performs, in sequence: create `test.txt` → read it → append/update it →
read it again → delete it. Each step logs its status, and missing-file
errors during deletion are handled gracefully.

## 5. Dice Generator

```bash
node dice.js        # rolls once
node dice.js 5       # rolls 5 times
```

Uses `crypto.randomInt(1, 7)` for cryptographically secure randomness
instead of `Math.random()`.

## Notes

- All async file operations use Node's non-blocking, callback-based `fs` API,
  so console logs illustrate Node's asynchronous execution order.
- No external npm packages, Express, or database are used anywhere in this project.
