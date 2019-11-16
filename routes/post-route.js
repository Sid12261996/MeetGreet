const Router = require('express').Router(),
    controller = require('../controllers/post-controller');

//Register route
Router.post('/create', (req, res) => {
    let ctx = controller.Create(req.body);
    ctx(req, res);
});
Router.get('', (req, res) => {
    let ctx = controller.getAll();
    ctx(req, res);
});
Router.get('/:id', (req, res) => {
    let ctx = controller.get(req.params.id);
    ctx(req, res);
});

module.exports = Router;
