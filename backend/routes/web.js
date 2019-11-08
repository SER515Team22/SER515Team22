const express = require('express');
let middleware = require('../middlewares/auth.js');
const router = express.Router();

const expression_controller = require('../controllers/expressionController');
const auth_controller = require('../controllers/authController');

// Expression evaluation API
router.get('/',   middleware.checkToken,expression_controller.root);
router.post('/evaluate',  middleware.checkToken,expression_controller.evaluate);

// Auth API's
router.post('/register', auth_controller.register);
router.post('/login', auth_controller.login);

module.exports = router;
