const mongo = require('mongoose'),
    moment = require('moment'),
    schema = mongo.Schema;

//model

const securityLockSchema = new schema({
    securityPasswordLock: {type: Number, maxlength: 3},
    isNameChanged: {type: Number, maxlength: 3},
    islogged: Boolean,
    SecurityQuestion: String
});

const securityLock = mongo.model('Security', securityLockSchema);


const User = new schema({
    _id: schema.Types.ObjectId,
    createdAt: {type: schema.Types.Date, required: true, default: moment.utc()},
    updatedAt: {type: schema.Types.Date, required: true, default: moment.utc()},
    deletedAt: {type: schema.Types.Date, default: null},
    Email: {type: schema.Types.String, required: true, minlength: 6},
    Name: String,
    LastName: String,
    Age: {type: schema.Types.Number},
    DateOfBirth:{type:schema.Types.Date,default: null},
    DOBView:{types:schema.Types.Boolean,default:true},
    Gender: {type: String, enum: ["Male", "Female", "Other"]},
    Password: {type: String, required: true, minlength: 6},
    MobileNo: {type: String},
    CurrentJobPlace: String,
    State: String,
    City: String,
    Country: String,
    Security: {type: schema.Types.ObjectId, ref: securityLock},
    inCommunity: Boolean,
    // Post: ["Status", "Images", "Shared-post", "Videos"],
    JobProfile: [String],
    ImageUrl: {type: String, default: 'default'},
    CoverUrl: {type: schema.Types.String},
    Status:{type: schema.Types.String,default: `Lets's get started`},
    Profession:{type:schema.Types.String,defalut: null}
    
});

module.exports = mongo.model('Users', User);
