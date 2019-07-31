const mongo = require('mongoose'),
    schema = mongo.Schema
;

//model

const securityLockSchema = new schema({
    securityPasswordLock: {type:Number, maxlength: 3},
    isNameChanged: {type:Number, maxlength: 3},
    islogged: Boolean,
    SecurityQuestion:String
});
const securityLock = mongo.model('Security',securityLockSchema);

const User = new schema({
    _id: schema.Types.ObjectId,
    Email:{type: schema.Types.String, required: true, minlength: 6},
    Name: (50),
    Age: {type: schema.Types.Number, required: true},
    Gender: {type: String, enum: ["Male", "Female"]},
    Password: {type: String, required: true, minlength: 6, maxlength: 20},
    MobileNo: {type: String, required: true},
    CurrentJobPlace: String,
    State: String,
    City: String,
    Country: String,
    Security: {type:schema.Types.ObjectId, ref:securityLock},
    inCommunity: Boolean,
    // Post: ["Status", "Images", "Shared-post", "Videos"],
    JobProfile: [String],
    ImageUrl:String
});

module.exports = mongo.model('Users', User);
