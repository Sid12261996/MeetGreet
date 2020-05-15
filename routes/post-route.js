const Router = require('express').Router(),
    controller = require('../controllers/post-controller');

//Register route
Router.post('/:userId/create', async (req, res) => {
    try {
        let ctx = await controller.Create(req.body, req.params.userId);
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching Error', e);
        res.status(500).json(e);
    }
});
Router.get('/:userId', async (req, res) => {
    let ctx = await controller.getAll(req.params.userId);
    ctx(req, res);
});
Router.get('/:userId/:id', async (req, res) => {
    let ctx = await controller.get(req.params.id, req.params.userId);
    ctx(req, res);
});

Router.post('/:userId/create-bulk', async (req, res) => {
    try {
        let ctx = await controller.BulkPostCreate(req.body, req.params.userId);
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching Error', e);
        res.status(500).json(e);
    }
});
module.exports = Router;
