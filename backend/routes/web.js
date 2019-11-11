const express = require('express');
let middleware = require('../middlewares/auth.js');
const router = express.Router();

const expression_controller = require('../controllers/expressionController');
const auth_controller = require('../controllers/authController');
const assignment_controller = require('../controllers/assignmentController');

// Expression evaluation API
router.get('/',   middleware.checkToken,expression_controller.root);
router.post('/evaluate',  middleware.checkToken,expression_controller.evaluate);

// Assignments APIS
router.post('/newass', middleware.checkToken, assignment_controller.postass);
router.post('/newsubmit', middleware.checkToken, assignment_controller.submitass);
// router.get('/getass', middleware.checkToken, );


// Auth API's
router.post('/register', auth_controller.register);
router.post('/login', auth_controller.login);

module.exports = router;
