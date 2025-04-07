/**
 * @typedef {object} Express.Request
 * @property {object} user - User information.
 * @property {unknown} user._id - User's ID.
 * @property {string} user.username - User's username.
 */

// Example of usage:
/**
 * @param {Express.Request} req - The Express request object.
 * @param {object} res - The Express response object.
 */
function myHandler(req, res) {
    console.log(req.user.username);
  }
  
  export { myHandler };
  