const Router = require('express').Router(),
    controller = require('../controllers/album-controller');


Router.get('/:userId', async (req, res) => {
    let ctx = await controller.showAlbums(req.params.userId);
    ctx(req, res);
});
Router.post('/create', async (req, res) => {
    let ctx = await controller.createAlbum(req.body);
    ctx(req, res);
});
// todo: finish the edit album part
Router.get('/edit/:id', async (req, res) => {
    let ctx = await controller.editAlbum(req.params.id, req.body);
    ctx(req, res);
});

// todo: finish the delete album part
Router.delete('/delete/:id', async (req, res) => {
    let ctx = await controller.deleteAlbum(req.params.id);
    ctx(req, res);
});

module.exports = Router;
