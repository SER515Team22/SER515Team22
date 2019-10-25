const express = require('express');
const router = express.Router();

const expression_controller = require('../controllers/expressionController');


router.get('/', expressionController.root);
router.post('/evaluate',  expressionController.evaluate);
router.post('/register', authController.register);
module.exports = router;
