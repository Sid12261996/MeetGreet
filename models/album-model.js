const mongoose = require('mongoose'),
    schema = mongoose.Schema;

const albumModel = new schema({
    name: {type: String, required: true, default: 'Empty Album'},
    authorId: {type: schema.Types.ObjectId, required: true},
    postIds: {type: [schema.Types.ObjectId], required: true},
    CreatedAt: {type: schema.Types.Date, required: true, default: Date.now()},
    UpdatedAt: {type: schema.Types.Date, required: true, default: Date.now()},
    DeletedAt: {type: schema.Types.Date, default: null},
    albumType:{type:schema.Types.Number}
});

module.exports = mongoose.model('album', albumModel);
