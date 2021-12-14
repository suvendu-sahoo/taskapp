const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const UserController = require('../controllers/user');
const UserValidator = require('../validators/user');
const validate = require('../validators/validate');

router.post('/register', UserValidator.register(), validate, UserController.register);
router.post('/login', UserValidator.login(), validate, UserController.login);
router.post('/logout', auth, UserController.login);

module.exports = router;