const router = require('express').Router(),
    userController = require('../controllers/userController')
;


//User Registration API endpoint
router.post('/register',userController.Register);

//User Login API endpoint
router.post('/login',userController.Login);



module.exports = router;
