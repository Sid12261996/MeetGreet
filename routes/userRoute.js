const router = require('express').Router(),
    userController = require('../controllers/userController')
    ;


//User Registration API endpoint
router.post('/register',userController.Register);

//User Login API endpoint
router.post('/login',userController.Login);

router.put('/:userId/userPicUpdate', async (req, res) => {
    try {
        let ctx = await userController.UserPicUpdate(req.params.userId, req.body.NewImgUrl);
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching Error', e);
        res.status(500).json(e);
    }
});

router.get('/:userId/fetchUserData', async (req, res) => {
    try {
        let ctx = await userController.fetchData(req.params.userId);
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching Error', e);
        res.status(500).json(e);
    }
});


module.exports = router;
