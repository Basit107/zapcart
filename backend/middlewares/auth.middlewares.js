// This middleware checks if the user is authorized by verifying the JWT token.
// If the token is valid, it attaches the user information 
// to the request object and calls next().

import jwt from 'jsonwebtoken';
import { SECRET_SAULT } from '../config/env.js';
import Users from '../models/user.models.js';
import Admins from '../models/admin.models.js';

export const authorizeUser = async (request, response, next) => {
  try {
    let token;

    if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
      token = request.headers.authorization.split(' ')[1];
    }

    if(!token) return response.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, SECRET_SAULT);

    const user = await Users.findById(decoded.userId);

    if(!user) return response.status(401).json({ message: 'Unauthorized' });

    request.user = user;

    next();
  } catch (error) {
    response.status(401).json({ message: 'Unauthorized', error: error.message });
  }
}

export const authorizeAdmin = async (request, response, next) => {
  try {
    let token;

    if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
      token = request.headers.authorization.split(' ')[1];
    }

    if(!token) return response.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, SECRET_SAULT);

    const admin = await Admins.findById(decoded.userId);

    if(!admin) return response.status(401).json({ message: 'Unauthorized' });

    request.admin = admin;

    next();
  } catch (error) {
    response.status(401).json({ message: 'Unauthorized', error: error.message });
  }
}

