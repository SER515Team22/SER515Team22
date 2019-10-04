const express = require('express');
const router = express.Router();

const expression_controller = require('../controllers/controller');


router.get('/', expression_controller.root);
router.post('/evaluate',  expression_controller.evaluate);
module.exports = router;
