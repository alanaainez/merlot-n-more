import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET_KEY || 'defaultsecret';
const expiration = '2h';

export const authenticateToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'You need to be logged in!' });
  }

  try {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    const { data } = jwt.verify(token, secret);
    req.user = data;
    next();
  } catch (err) {
    console.log('Invalid token:', err.message);
    return res.status(401).json({ message: 'Invalid token!' });
  }
};

export const signToken = (username, _id) => {
  const payload = { username, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
