const router   =   require('express').Router(),
userController = require('../controllers/userController');
const JwtToken = require('../AuthVerify/AuthVerify');

//User Registration API endpoint
router.post('/register',userController.Register);

//User Login API endpoint
router.post('/login',userController.Login);

router.put('/changePassword',JwtToken, async (req, res) => {

try{

  let ctx=await userController.changePassword(req.body._id,req.body.currentPassword,req.body.newPassword);
  ctx(req,res);
}
catch(e){
    console.log('Route is catching Error',e);
    res.status(500).json(e);
}

});

router.put('/updateProfession',JwtToken, async (req,res) => {

try{
    let ctx=await userController.updateProfession(req.body._id,req.body.newProfession);
    ctx(req,res);
}
catch(e){
 console.log('Route is carting Error',e);
 res.status(500).json(e);
}
                                                                                                           
});


router.put('/:userId/coverPicUpdate', async (req, res) => {
    try {
        let ctx = await userController.coverPicUpdate(req.params.userId,req.body.NewCoverUrl);
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching Error', e);
        res.status(500).json(e);
    }
});

router.put('/nameUpdate',JwtToken,async (req, res) => {
    try {
        let ctx = await userController.changeName(req.body._id, req.body.Name);
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching Error', e);
        res.status(500).json(e);
    }
});

router.put('/jobProfile',JwtToken,async (req,res) =>{

try{

let ctx=await userController.jobProfile(req.body._id,req.body.jobProfile);
ctx(req,res);
}
catch(e){

    console.log('Route is catching Error',e);
    res.status(500).json(e);
}
});

router.put('/updateStatus',JwtToken,async (req,res) => {
    
    try{
    let ctx = await userController.updateStatus(req.body._id,req.body.newStatus);
    ctx(req,res);
    
    }
    catch(e){

    console.log('Route is catching Error',e);
    res.status(500).json(e);

    }
});

router.put('/updateDOB',JwtToken,async (req,res) => {
    
    try{
    let ctx = await userController.updateDOB(req.body._id,req.body.DOB);
    ctx(req,res);
    
    }
    catch(e){

    console.log('Route is catching Error',e);
    res.status(500).json(e);

    }
});



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
