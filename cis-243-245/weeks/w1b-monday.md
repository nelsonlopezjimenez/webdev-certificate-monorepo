# CIS 243 — Backend Web Development
## Quarter 3 Curriculum Guide | 10 Weeks | Mon–Thu, 3 hrs/day

> **Prerequisites assumed:** HTML/CSS (CIS 241), JavaScript (CIS 242), minimal terminal experience, some React exposure.
> **Stack:** Node.js · Express v4 · MongoDB (local) · Mongoose · JWT · React (frontend integration) · Tailwind CSS

---

## 🗓️ 10-Week Rough Schedule

<details>
| Week | Theme | Key Deliverable |
|------|-------|----------------|
| **1** | Node.js Fundamentals + Motivation | Run scripts, use npm packages |
| **2** | Express v4 from Scratch | First working HTTP server |
| **3** | REST API Design + Advanced Routing | Multi-route API w/ Postman testing |
| **4** | MongoDB Local Setup + CRUD | Database-backed Express app |
| **5** | Mongoose Schemas + Models | Typed data with validation |
| **6** | MVC Architecture | Refactored app into M/V/C folders |
| **7** | Signup / Login / Protected Routes | Working auth backend |
| **8** | Advanced Token Handling + Security | Refresh tokens, httpOnly cookies |
| **9** | Intro to Hono + SSR Modern Approaches | Side-by-side comparison with Express |
| **10** | Capstone Project + Code Review | Full-stack MERN mini-app |
</details>
---

# 📅 WEEK 2 — Monday April 13
## Monday — April 13

### Reading Command-Line Arguments

```js
// args.js
const args = process.argv.slice(2); // [0]=node, [1]=script path, [2+]=your args
const yourName = args[0] || "stranger";
console.log(`Hello, ${yourName}!`);
```

```bash
node args.js Nelson
# → Hello, Nelson!
```

### Writing and Importing Modules (CommonJS — default in Node)

```js
// math.js — exporting
function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }

module.exports = { add, multiply };
```

```js
// app.js — importing
const { add, multiply } = require('./math');

console.log(add(3, 4));       // 7
console.log(multiply(3, 4));  // 12
```

### ES Module Syntax (Modern — requires `"type": "module"` in package.json)

```js
// math.mjs or with "type":"module" in package.json
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }
```

```js
import { add, multiply } from './math.js';
```

> ⚠️ **Common mistake #1:** Mixing `require()` and `import` in the same project. Pick one. Express v4 tutorials typically use CommonJS (`require`). We'll use CommonJS for consistency with Express v4.

---

## Tuesday — npm: The Package Ecosystem

### What is npm?

> npm = Node Package Manager. Over 2 million packages. You already know `jQuery` — npm is how JavaScript developers share reusable code.

### Initializing a Project

```bash
mkdir my-node-app
cd my-node-app
npm init -y        # creates package.json with defaults
```

> ⚠️ **Common mistake #2:** Running `npm install` before `npm init`. Always initialize first.

### Installing Fun Packages (Local Offline Registry via Verdaccio)

```bash
npm install knock-knock-jokes
npm install cat-me
npm install @faker-js/faker@10.3.0 //disregard the warning
```

**Using them:**

```js
// jokes.js
const knockknock = require('knock-knock-jokes');

for (let i = 0; i < 3; i++) {
  console.log(knockknock());
  console.log('---');
}
```

```js
// cats.js
const catMe = require('cat-me');
console.log(catMe());
```

```js
// fakeData.js
// ESM

import { faker } from '@faker-js/faker';

// CJS
const { faker } = require('@faker-js/faker');


// Generate 5 fake users
const users = Array.from({ length: 5 }, () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  city: faker.location.city(),
  job: faker.person.jobTitle(),
}));

console.table(users);
```

### Understanding `package.json`

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "knock-knock-jokes": "^1.0.0"
  }
}
```

```bash
npm run start   # runs node app.js
npm run dev     # runs with nodemon (auto-restart on save)
```

> ⚠️ **Common mistake #3:** Committing `node_modules/` to Git. Always add to `.gitignore`:
> ```
> node_modules/
> .env
> ```

### `package.json` vs `package-lock.json`

| File | Purpose |
|------|---------|
| `package.json` | Your intent ("I want express ~4.18") |
| `package-lock.json` | Exact versions installed (commit this!) |
| `node_modules/` | Actual code (never commit this) |

---

## Wednesday — Reusable Code + Mini Project

### Writing a Reusable Utility Module

```js
// utils/formatDate.js
function formatDate(date = new Date()) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function greetByTime() {
  const hour = new Date().getHours();
  if (hour < 12) return '🌅 Good morning!';
  if (hour < 18) return '☀️ Good afternoon!';
  return '🌙 Good evening!';
}

module.exports = { formatDate, greetByTime };
```

```js
// app.js
const { formatDate, greetByTime } = require('./utils/formatDate');
const { faker } = require('@faker-js/faker');

console.log(greetByTime());
console.log('Today is:', formatDate());

// Fake user greeter
const user = { name: faker.person.fullName() };
console.log(`Welcome, ${user.name}!`);
```

### 🔨 Week 2 Project: "Node Profile Generator"

Students build a CLI script that:
1. Accepts a `--count` argument for number of profiles
2. Uses `@faker-js/faker` to generate fake user objects
3. Outputs a formatted table to the console
4. Saves results to a `.json` file using `fs.writeFileSync`

```js
// profileGenerator.js
const { faker } = require('@faker-js/faker');
const fs = require('fs'); // built-in, no install needed

const count = parseInt(process.argv[2]) || 5;

const profiles = Array.from({ length: count }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  bio: faker.lorem.sentence(),
  avatar: faker.image.avatarGitHub(),
}));

console.table(profiles);

fs.writeFileSync('profiles.json', JSON.stringify(profiles, null, 2));
console.log(`\n✅ Saved ${count} profiles to profiles.json`);
```

```bash
node profileGenerator.js 10
```

### ⚠️ Week 2 Common Mistakes

| Mistake | Fix |
|---------|-----|
| `require` path without `./` | `require('./math')` not `require('math')` |
| Forgetting `npm init` before installing | Always `npm init -y` first |
| Editing files inside `node_modules/` | Never. Add it to `.gitignore` |
| Using `document` or `window` in Node | They don't exist. Node ≠ browser |
| `Cannot find module` error | Check spelling, check you installed it |

---

### 📚 Week 2 Resources

- **MDN:** [Introduction to server-side programming](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction)
- **W3Schools:** [Node.js Tutorial](https://www.w3schools.com/nodejs/)
- **freeCodeCamp:** [Node.js and Express for Beginners](https://www.freecodecamp.org/news/free-nodejs-course/)
- **Video:** [Node.js Crash Course – Traversy Media (YouTube)](https://www.youtube.com/watch?v=fBNz5xF-Kx4)
- **Node.js Docs:** [https://nodejs.org/en/docs](https://nodejs.org/en/docs)

---

---

# 📅 WEEK 3 — Express v4 from Scratch

## Learning Goals
- Understand the HTTP request/response cycle
- Install and configure Express v4
- Define GET, POST, PUT, DELETE routes
- Use middleware (built-in and custom)
- Serve static files
- Test routes with REST Client (VS Code extension)
- Introduction to Tailwind CSS for server-rendered HTML

---

## Monday — HTTP & The Request/Response Cycle

### How the Web Actually Works

```
Browser                          Server
  |                                |
  |  GET /api/users HTTP/1.1       |
  |  Host: localhost:3000          |
  | ─────────────────────────────> |
  |                                |
  |  HTTP/1.1 200 OK               |
  |  Content-Type: application/json|
  |  [{"name": "Alice"}, ...]      |
  | <───────────────────────────── |
```

### HTTP Methods — The Vocabulary of the Web

| Method | Meaning | Example |
|--------|---------|---------|
| `GET` | Read data | Get list of users |
| `POST` | Create data | Register new user |
| `PUT` | Replace data | Update entire user profile |
| `PATCH` | Partial update | Change only email |
| `DELETE` | Remove data | Delete a post |

### HTTP Status Codes You'll Use Most

| Code | Meaning |
|------|---------|
| `200` | OK |
| `201` | Created |
| `400` | Bad Request (client error) |
| `401` | Unauthorized (not logged in) |
| `403` | Forbidden (logged in but not allowed) |
| `404` | Not Found |
| `500` | Internal Server Error |

---

## Tuesday — Your First Express v4 Server

### Setup

```bash
mkdir express-intro
cd express-intro
npm init -y
npm install express
npm install --save-dev nodemon
```

Add to `package.json`:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### Minimal Express Server

```js
// server.js
const express = require('express');

const app = express();
const PORT = 3000;

// Built-in middleware: parse JSON request bodies
app.use(express.json());

// Your first route
app.get('/', (req, res) => {
  res.send('Hello from Express! 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
```

```bash
npm run dev
# Open browser → http://localhost:3000
```

> ⚠️ **Common mistake #4:** Forgetting `app.use(express.json())`. Without this, `req.body` is `undefined` on POST requests.

### Understanding the Route Handler

```js
app.get('/about', (req, res) => {
  //  ↑              ↑    ↑
  // method        req  res
  // path
  
  res.status(200).json({ message: 'About page' });
  //  ↑             ↑
  // set status   send JSON
});
```

### Route Parameters and Query Strings

```js
// Route parameter — part of the URL path
// GET /users/42
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Getting user with id: ${id}` });
});

// Query string — ?key=value after the path
// GET /search?term=express&limit=10
app.get('/search', (req, res) => {
  const { term, limit = 5 } = req.query;
  res.json({ searching: term, limit: Number(limit) });
});
```

---

## Wednesday — Middleware + CRUD Routes

### What is Middleware?

```
Request → [middleware 1] → [middleware 2] → Route Handler → Response
```

Middleware is any function with the signature `(req, res, next)`. It runs **before** your route handler.

```js
// Custom logger middleware
function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next(); // MUST call next() or the request hangs forever
}

app.use(logger); // applies to ALL routes
```

> ⚠️ **Common mistake #5:** Forgetting to call `next()` in custom middleware. The request will hang and eventually time out.

### Building a Full CRUD API (In-Memory, No Database Yet)

```js
// server.js — complete in-memory CRUD example
const express = require('express');

const app = express();
app.use(express.json());

// Temporary in-memory store (Week 4 we replace with MongoDB)
let books = [
  { id: 1, title: 'The Pragmatic Programmer', author: 'Hunt & Thomas' },
  { id: 2, title: 'You Don\'t Know JS', author: 'Kyle Simpson' },
];
let nextId = 3;

// GET all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET one book
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// POST — create a book
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'title and author are required' });
  }
  const newBook = { id: nextId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT — replace a book
app.put('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Book not found' });
  books[index] = { id: Number(req.params.id), ...req.body };
  res.json(books[index]);
});

// DELETE a book
app.delete('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Book not found' });
  const deleted = books.splice(index, 1);
  res.json({ message: 'Deleted', book: deleted[0] });
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));
```

### Testing with REST Client (VS Code Extension)

Create `test.http` in your project root:

```http
### Get all books
GET http://localhost:3000/api/books

### Get one book
GET http://localhost:3000/api/books/1

### Create a book
POST http://localhost:3000/api/books
Content-Type: application/json

{
  "title": "Clean Code",
  "author": "Robert C. Martin"
}

### Update a book
PUT http://localhost:3000/api/books/1
Content-Type: application/json

{
  "title": "The Pragmatic Programmer (Updated)",
  "author": "Hunt & Thomas"
}

### Delete a book
DELETE http://localhost:3000/api/books/3
```

> Click **"Send Request"** above each block in VS Code — no Postman needed.

---

## Thursday — Static Files + Tailwind CSS + Server-Side Rendering

### Serving Static Files

```js
// Serve everything in /public as static files
app.use(express.static('public'));
```

```
project/
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── server.js
└── package.json
```

### Modern Server-Side Rendering (No Pug/EJS)

We'll use **template literals** to build HTML strings — clean, modern, no extra dependencies.

```js
// server.js — SSR with template literals + Tailwind CDN
app.get('/books-page', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Book List</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen p-8">
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold text-indigo-600 mb-6">📚 Book List</h1>
    <ul class="space-y-3">
      ${books.map(book => `
        <li class="bg-white rounded-xl shadow p-4 flex justify-between items-center">
          <div>
            <p class="font-semibold text-gray-800">${book.title}</p>
            <p class="text-sm text-gray-500">${book.author}</p>
          </div>
          <span class="text-xs text-indigo-400 font-mono">id: ${book.id}</span>
        </li>
      `).join('')}
    </ul>
  </div>
</body>
</html>`;

  res.send(html);
});
```

> 💡 **Note on Tailwind in production:** The CDN script is for development/teaching only. In production you'd run the Tailwind CLI build step. For this course, CDN is fine.

### Express Router — Organizing Routes

As your app grows, keep routes in separate files:

```js
// routes/books.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { /* ... */ });
router.get('/:id', (req, res) => { /* ... */ });
router.post('/', (req, res) => { /* ... */ });

module.exports = router;
```

```js
// server.js
const booksRouter = require('./routes/books');
app.use('/api/books', booksRouter);
// Now router handles /api/books/* automatically
```

> ⚠️ **Common mistake #6:** Doubling the path prefix. If you mount at `/api/books`, your router's routes should be `/` and `/:id`, not `/api/books/` and `/api/books/:id`.

### 🔨 Week 3 Project: "Book Tracker API"

Students build and test a full CRUD REST API:

1. `GET /api/books` — list all books
2. `GET /api/books/:id` — get one (404 if not found)
3. `POST /api/books` — create (validate title + author)
4. `PUT /api/books/:id` — update
5. `DELETE /api/books/:id` — delete
6. `GET /books-page` — HTML page rendered server-side with Tailwind
7. Custom logger middleware on every request
8. All routes tested with `test.http`

**Stretch:** Add a `GET /api/books/search?author=Kyle` route using `.filter()`.

---

### ⚠️ Week 3 Common Mistakes

| Mistake | Fix |
|---------|-----|
| `req.body` is `undefined` | Add `app.use(express.json())` before routes |
| `next()` never called in middleware | Always call it unless sending a response |
| `Cannot GET /` in browser | Check route path matches exactly |
| Server doesn't restart on save | Make sure `nodemon` is installed, using `npm run dev` |
| Route `/books/:id` catches `/books/search` | Put `/books/search` route **before** `/books/:id` |
| Port already in use | `lsof -i :3000` then `kill -9 <PID>` or use a different port |

---

### 📚 Week 3 Resources

- **Express v4 Docs:** [https://expressjs.com/en/4x/api.html](https://expressjs.com/en/4x/api.html)
- **MDN:** [HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- **W3Schools:** [Node.js HTTP Module](https://www.w3schools.com/nodejs/nodejs_http.asp)
- **freeCodeCamp:** [Express.js Crash Course](https://www.freecodecamp.org/news/express-explained-with-examples-installation-routing-middleware-and-more/)
- **Tailwind CSS Docs:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Video:** [Express JS Crash Course – Traversy Media](https://www.youtube.com/watch?v=L72fhGm1tfE)
- **REST Client extension:** [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

---

---

## 🔭 Preview: Weeks 3–12 Topics

> Full weekly breakdowns available on request.

- **Week 3:** Express Router (advanced), error-handling middleware, environment variables with `dotenv`
- **Week 4:** MongoDB local install, Compass GUI, `mongosh`, raw driver CRUD
- **Week 5:** Mongoose — schemas, models, validators, virtuals
- **Week 6:** MVC folder structure — `models/`, `controllers/`, `routes/`, `middleware/`
- **Week 7:** What is JWT? `jsonwebtoken` package, signing and verifying tokens
- **Week 8:** `bcryptjs` password hashing, POST `/auth/signup`, POST `/auth/login`, protected route middleware
- **Week 9:** Connecting React frontend — `axios`, storing tokens, React Router protected routes
- **Week 10:** Refresh tokens, `httpOnly` cookies, token expiration strategy
- **Week 11:** Intro to **Hono** — similarities/differences with Express, Hono on Node.js vs Bun/Deno
- **Week 12:** Capstone — Full MERN mini-app (topic TBD by class vote), code review, demo day

---

## ⚡ Hono Preview (Week 11)

Hono is a fast, lightweight web framework — similar to Express but with a modern API, TypeScript-first design, and multi-runtime support.

| Feature | Express v4 | Hono |
|---------|-----------|------|
| Syntax | `req, res` | `c` (context object) |
| TypeScript | Add-on | Built-in |
| Runs on | Node.js only | Node, Bun, Deno, Cloudflare Workers |
| Middleware | `app.use()` | `app.use()` (same concept) |
| Speed | Fast | Very fast (Bun runtime) |
| Maturity | Very mature (2010) | Newer (2022), growing fast |

```js
// Same route — Express vs Hono comparison

// Express v4
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// Hono
app.get('/api/hello', (c) => {
  return c.json({ message: 'Hello from Hono!' });
});
```

---

*Document generated for CIS 243 — Edmonds College Web Development Certificate Program*
*Stack: Node.js · Express v4 · MongoDB (local) · Mongoose · JWT · React · Tailwind CSS*
