const mongo = require('mongoose'),
    schema = mongo.Schema,
    entity = require('../models/base-entity').Entity,
    privacy = require('./privacy').Posts
;

const posts = new schema({
    _id: {type: schema.Types.ObjectId, default: new mongo.Types.ObjectId(), required: true},
    baseEntity: entity,
    Title: {type: String, required: true, default: ''},
    ImageUrl: String,
    VideoUrl: String,
    postedBy: schema.Types.ObjectId,
    privacy: privacy,
});

module.exports = mongo.model('Users', posts);
