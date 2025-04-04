// /**
//  * @typedef {import('../models/User').User} User
//  * @typedef {import('../models/Book').Book} Book
//  */

// // route to get logged in user's info (needs the token)
// export const getMe = (token) => {
//   return fetch('/api/users/me', {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

// /**
//  * Creates a new user.
//  * @param {User} userData - The user data to create.
//  */
// export const createUser = (userData) => {
//   return fetch('/api/users', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });
// };

// /**
//  * Logs in a user.
//  * @param {User} userData - The user's login credentials.
//  */
// export const loginUser = (userData) => {
//   return fetch('/api/users/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });
// };

// /**
//  * Saves book data for a logged-in user.
//  * @param {Book} bookData - The book data to save.
//  * @param {string} token - The user's authentication token.
//  */
// export const saveBook = (bookData, token) => {
//   return fetch('/api/users', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(bookData),
//   });
// };

// /**
//  * Removes saved book data for a logged-in user.
//  * @param {string} bookId - The ID of the book to delete.
//  * @param {string} token - The user's authentication token.
//  */
// export const deleteBook = (bookId, token) => {
//   return fetch(`/api/users/books/${bookId}`, {
//     method: 'DELETE',
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

// /**
//  * Makes a search to the Google Books API.
//  * @param {string} query - The search query.
//  */
// export const searchGoogleBooks = (query) => {
//   return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
// };
