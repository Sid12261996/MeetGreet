const mongo = require('mongoose'),
    schema = mongo.Schema
;

//model

const User = new schema({
    _id: schema.Types.ObjectId,
    //Add rest of the entity of users below it
});

module.exports = mongo.model('Users', User);
