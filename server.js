const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

app.use(express.json());

// Helper function to read DB
async function readDB() {
  const data = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
}

// Helper function to write DB
async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

// Task 1: Get all books
app.get('/books', async (req, res) => {
  const db = await readDB();
  res.json(db.books);
});

// Task 2: Get books by ISBN
app.get('/books/isbn/:isbn', async (req, res) => {
  const db = await readDB();
  const books = db.books.filter(book => book.isbn === req.params.isbn);
  res.json(books);
});

// Task 3: Get books by author
app.get('/books/author/:author', async (req, res) => {
  const db = await readDB();
  const books = db.books.filter(book => book.author.toLowerCase().includes(req.params.author.toLowerCase()));
  res.json(books);
});

// Task 4: Get books by title
app.get('/books/title/:title', async (req, res) => {
  const db = await readDB();
  const books = db.books.filter(book => book.title.toLowerCase().includes(req.params.title.toLowerCase()));
  res.json(books);
});

// Task 5: Get book reviews
app.get('/books/:bookId/reviews', async (req, res) => {
  const db = await readDB();
  const reviews = db.reviews.filter(review => review.bookId === req.params.bookId);
  res.json(reviews);
});

// Task 6: Register new user
app.post('/users', async (req, res) => {
  const db = await readDB();
  const newUser = {
    id: String(db.users.length + 1),
    email: req.body.email,
    password: req.body.password
  };
  db.users.push(newUser);
  await writeDB(db);
  res.status(201).json(newUser);
});

// Task 7: Login user
app.post('/login', async (req, res) => {
  const db = await readDB();
  const user = db.users.find(
    user => user.email === req.body.email && user.password === req.body.password
  );
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Task 8: Add/modify review
app.post('/reviews', async (req, res) => {
  const db = await readDB();
  const { bookId, userId, review } = req.body;
  const existingReview = db.reviews.find(
    r => r.bookId === bookId && r.userId === userId
  );

  if (existingReview) {
    existingReview.review = review;
    await writeDB(db);
    res.json(existingReview);
  } else {
    const newReview = {
      id: String(db.reviews.length + 1),
      bookId,
      userId,
      review
    };
    db.reviews.push(newReview);
    await writeDB(db);
    res.status(201).json(newReview);
  }
});

// Task 9: Delete review
app.delete('/reviews/:bookId/:userId', async (req, res) => {
  const db = await readDB();
  const reviewIndex = db.reviews.findIndex(
    r => r.bookId === req.params.bookId && r.userId === req.params.userId
  );
  if (reviewIndex === -1) {
    return res.status(404).json({ error: 'Review not found' });
  }
  const deletedReview = db.reviews.splice(reviewIndex, 1)[0];
  await writeDB(db);
  res.json(deletedReview);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});