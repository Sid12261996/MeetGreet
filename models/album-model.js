const mongoose = require('mongoose'),
    schema = mongoose.Schema;

const albumModel = new schema({
    name: {type: String, required: true, default: 'Empty Album'},
    authorId: {type: schema.Types.ObjectId, required: true},
    postIds: {type: [schema.Types.ObjectId], required: true},
    CreatedAt: {type: Schema.Types.Date, required: true, default: Date.now()},
    UpdatedAt: {type: Schema.Types.Date, required: true, default: Date.now()},
    DeletedAt: {type: Schema.Types.Date, default: null}
});

module.exports = mongoose.model('album', albumModel);
