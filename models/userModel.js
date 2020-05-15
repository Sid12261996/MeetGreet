const mongo = require('mongoose'),
    moment = require('moment'),
    settingModel=require('./settings-model'),   
    schema = mongo.Schema,
settingsModel = require('./settings-model');

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
    CoverUrl: {type: String, default: 'default'},
    Status:{type: schema.Types.String, default: `Lets's get started`},
    Profession:{type:schema.Types.String, default: null}
    
});

User.virtual('DOBView').
  get(function() { return settingModel.find({userId:this._id})}).
  set(function(DOBView){
  settingModel.findOneAndUpdate({userId:this._id},{DOBView:DOBView})
  });
 

User.virtual('DobView').get(function () {
    return settingsModel.find({userId:this._id});
})

module.exports = mongo.model('Users', User);

