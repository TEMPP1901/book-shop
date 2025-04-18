const axios = require('axios');

const API_URL = 'http://localhost:3000';

// Task 1: Get the book list available in the shop (2 Points)
async function getBookList() {
  try {
    const response = await axios.get(`${API_URL}/books`);
    console.log('Book List:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error.message);
    throw error;
  }
}

// Task 2: Get the books based on ISBN (2 Points)
async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`${API_URL}/books/isbn/${isbn}`);
    console.log('Book by ISBN:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching book by ISBN:', error.message);
    throw error;
  }
}

// Task 3: Get all books by Author (2 Points)
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${API_URL}/books/author/${author}`);
    console.log('Books by Author:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching books by author:', error.message);
    throw error;
  }
}

// Task 4: Get all books based on Title (2 Points)
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${API_URL}/books/title/${title}`);
    console.log('Books by Title:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching books by title:', error.message);
    throw error;
  }
}

// Task 5: Get book Review (2 Points)
async function getBookReview(bookId) {
  try {
    const response = await axios.get(`${API_URL}/books/${bookId}/reviews`);
    console.log('Book Reviews:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    throw error;
  }
}

// Task 6: Register New user (3 Points)
async function registerUser(email, password) {
  try {
    const response = await axios.post(`${API_URL}/users`, { email, password });
    console.log('User Registered:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
}

// Task 7: Login as a Registered user (3 Points)
async function loginUser(email, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log('User Logged In:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw error;
  }
}

// Task 8: Add/Modify a book review (2 Points)
async function addOrModifyReview(bookId, userId, review) {
  try {
    const response = await axios.post(`${API_URL}/reviews`, { bookId, userId, review });
    console.log('Review Added/Modified:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding/modifying review:', error.message);
    throw error;
  }
}

// Task 9: Delete book review added by that particular user (2 Points)
async function deleteReview(bookId, userId) {
  try {
    const response = await axios.delete(`${API_URL}/reviews/${bookId}/${userId}`);
    console.log('Review Deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error.message);
    throw error;
  }
}

// Task 10: Get all books – Using async callback function (2 Points)
function getAllBooksAsync(callback) {
  axios.get(`${API_URL}/books`)
    .then(response => callback(null, response.data))
    .catch(error => callback(error, null));
}

// Task 11: Search by ISBN – Using Promises (2 Points)
function searchByISBN(isbn) {
  return axios.get(`${API_URL}/books/isbn/${isbn}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error('Error searching by ISBN: ' + error.message);
    });
}

// Task 12: Search by Author (2 Points)
async function searchByAuthor(author) {
  try {
    const response = await axios.get(`${API_URL}/books/author/${author}`);
    console.log('Books by Author:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error searching by author:', error.message);
    throw error;
  }
}

// Task 13: Search by Title (2 Points)
async function searchByTitle(title) {
  try {
    const response = await axios.get(`${API_URL}/books/title/${title}`);
    console.log('Books by Title:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error searching by title:', error.message);
    throw error;
  }
}

// Test all functions
async function testAllFunctions() {
  console.log('Testing Task 1: Get Book List');
  await getBookList();

  console.log('\nTesting Task 2: Get Book by ISBN');
  await getBookByISBN('12345');

  console.log('\nTesting Task 3: Get Books by Author');
  await getBooksByAuthor('J.K. Rowling');

  console.log('\nTesting Task 4: Get Books by Title');
  await getBooksByTitle('Harry Potter');

  console.log('\nTesting Task 5: Get Book Review');
  await getBookReview('1');

  console.log('\nTesting Task 6: Register New User');
  await registerUser('newuser@example.com', 'newpassword123');

  console.log('\nTesting Task 7: Login User');
  await loginUser('user@example.com', 'password123');

  console.log('\nTesting Task 8: Add/Modify Review');
  await addOrModifyReview('1', '1', 'Amazing book!');

  console.log('\nTesting Task 9: Delete Review');
  await deleteReview('1', '1');

  console.log('\nTesting Task 10: Get All Books (Async Callback)');
  getAllBooksAsync((error, books) => {
    if (error) console.error('Error:', error.message);
    else console.log('All Books:', books);
  });

  console.log('\nTesting Task 11: Search by ISBN (Promises)');
  searchByISBN('12345')
    .then(book => console.log('Book by ISBN:', book))
    .catch(error => console.error(error.message));

  console.log('\nTesting Task 12: Search by Author');
  await searchByAuthor('J.K. Rowling');

  console.log('\nTesting Task 13: Search by Title');
  await searchByTitle('Harry Potter');
}

testAllFunctions();