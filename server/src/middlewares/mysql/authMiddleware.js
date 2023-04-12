import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Models from '../../models/mysql/index.js';
const User = Models.User;

const authProtected = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // get user from token
      req.user = await User.findOne({ where: { id: decoded.id } });
      req.token = token;
      next();
    } catch (error) {
      // console.log(error);
      res.status(401).json({
        message: `Not Authorized`,
        status: false,
      });
    }
  }

  if (!token) {
    res.status(401).json({
      message: `Not authorized, no token`,
      status: false,
    });
  }
});

export default authProtected;
