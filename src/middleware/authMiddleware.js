const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');
const { AsyncHandler } = require('../utils/AsyncHandler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const auth = AsyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new ApiError(401, 'Unauthorized')
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const user = await User.findById(decoded?._id).select('-password');
        // console.log(user);
        if (!user) {
            throw new ApiError(401, "Invalid Token")
        }
        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(500, error.message)
    }
});

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

module.exports = {
    auth,
    isAdmin
}