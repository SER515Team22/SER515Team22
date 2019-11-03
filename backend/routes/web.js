const express = require('express');
const router = express.Router();

const expression_controller = require('../controllers/controller');


router.get('/', expression_controller.root);
router.post('/evaluate',  expression_controller.evaluate);
router.post('/postquestion', expression_controller.postquestion);
module.exports = router;
