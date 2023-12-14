const express = require('express');
const { register, login } = require('../controllers/userControllers');
const { LoggedIn } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', register);

router.post('/login', login);

module.exports = router;
