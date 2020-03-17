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
    Name: String,
    LastName: String,
    Age: {type: schema.Types.Number},
    Gender: {type: String, enum: ["Male", "Female","Other"]},
    Password: {type: String, required: true, minlength: 6},
    MobileNo: {type: String},
    CurrentJobPlace: String,
    State: String,
    City: String,
    Country: String,
    Security: {type:schema.Types.ObjectId, ref:securityLock},
    inCommunity: Boolean,
    // Post: ["Status", "Images", "Shared-post", "Videos"],
    JobProfile: [String],
    ImageUrl: String,
    CoverUrl: String
});

module.exports = mongo.model('Users', User);
