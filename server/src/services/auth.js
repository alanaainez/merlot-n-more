import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = ({ req }) => {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
  
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
  
    if (!token) {
      return req;
    }
  
    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
      req.user = data;
    } catch (err) {
      console.log('Invalid token');
    }
  
    return req;
  };