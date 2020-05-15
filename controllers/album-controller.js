const controller = {},
    mongoose = require('mongoose'),
    Response = require('../utils/http-utils'),
    albumModel = require('../models/album-model'),
    albumTypes = require('../utils/enum').albumTypes;

controller.createAlbum = async function (album) {
    try {
        const postIds = album.postIds.map(x => {
            return mongoose.Types.ObjectId(x)
        });
        const newAlbum = new albumModel({
            name: album.name,
            authorId: mongoose.Types.ObjectId(album.authorId),
            postIds: postIds,
            albumType: albumTypes.normalOne
        });

        const savedAlbum = await newAlbum.save();
        return Response.Ok(savedAlbum);
    } catch (e) {
        console.log(e);
        return Response.ServerError(null, e);
    }
};
controller.createMultipleAlbums = function (multipleAlbums) {
// multiple albums have
}
controller.addPhotos = async function (body, userId) {
// add new photos to the album params : album unique id
    try {
        const albums = await albumModel.findByIdAndUpdate(body.id,{});
        const album = albums[0];

    } catch (e) {
        return Response.ServerError(null, e)
    }
}
controller.showAlbums = async function (userId) {
    try {
        const albums = await albumModel.find({authorId: mongoose.Types.ObjectId(userId)});
        return Response.Ok(albums);
    } catch (e) {
        console.log(e);
        return Response.ServerError(null, e)
    }
};
controller.editAlbum = async function (id) {

};
controller.deleteAlbum = async function (id) {

};


module.exports = controller;
