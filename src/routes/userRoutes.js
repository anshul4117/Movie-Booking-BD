const express = require('express');
const { userRegister, userLogin, getProfile } = require('../controllers/User/userController');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/profile', auth, getProfile);

module.exports = router