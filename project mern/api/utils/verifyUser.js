
import { errorHandler } from './error.js';
import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {

    const token = req.cookies.access_token;

    // Check if the token exists
    if (!token) return next(errorHandler(401, 'Access Denied! Token not provided.'));

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        if (err) {
            // Handle token verification errors (e.g., expired, invalid)
            return next(errorHandler(403, 'Invalid or expired token.'));
        }

        // Attach user information to the request object
        req.user = user;
        next();
    });
}
