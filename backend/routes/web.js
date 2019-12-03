const express = require('express');
let middleware = require('../middlewares/auth.js');
const router = express.Router();

const expression_controller = require('../controllers/expressionController');
const auth_controller = require('../controllers/authController');
const assignment_controller = require('../controllers/assignmentController');
const table_controller = require('../controllers/tableController');

// Expression evaluation API
router.get('/',   middleware.checkToken,expression_controller.root);
router.post('/evaluate',  middleware.checkToken,expression_controller.evaluate);

// Assignments APIS
router.post('/newass', middleware.checkToken, assignment_controller.postass); //for faculty 
router.get('/viewsubmissions', middleware.checkToken, assignment_controller.viewsubmissions); //for faculty
router.post('/newsubmit', middleware.checkToken, assignment_controller.submitass); // for student
router.get('/viewass', middleware.checkToken, assignment_controller.viewass);// for student



// Auth API's
router.post('/register', auth_controller.register);
router.post('/login', auth_controller.login);

// Truncate documents
router.get('/truncate', middleware.checkToken, table_controller.truncate);

module.exports = router;
