import { verify } from "jsonwebtoken";
import jwt from "../config/jwt";
import User from './../models/User';

export default async function (req, res, next) {
  // Search for a token
  const authHeader = req.headers.authorization;

  // If token does not exist, shows a message
  if (!authHeader) {
    return res.status(401).json({ error: 'Token is missing.'});
  }

  // Gets token's value
  const [, token] = authHeader.split(' ');

  try {
    // verifies token
    const decoded = await verify(token, jwt.secret);

    // Gets user's id
    const id = decoded.sub;

    // Assign id to request
    req.user = id;
    
    // Searches for a user to verify if it was deleted
    const user = await User.findById(id);

    if(user.deleted === true){
      return res.status(401).json({ error: 'Disabled User'})    
    }

    // pass middleware
    return next();

  } catch (error) {
    // Returns a error message
    return res.status(401).json({ error: 'Invalid JWT Token'})    
  }
}