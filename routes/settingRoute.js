const router = require('express').Router(),
    userController = require('../controllers/userController'),
    settingController = require('../controllers/setting-controller');

router.post('/:userId/userSetting', async (req, res) => {
    try {
        let ctx = await settingController.createSettings(req.body.userId, req.body);
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching Error', e);
        res.status(500).json(e);
    }

});

module.exports = router;
