// testing 
const mongo= require('mongoose');
schema = mongo.Schema;

const notification = new schema({
mobile: { type: schema.Types.Boolean,default:true},
desktop:{type: schema.Types.Boolean ,default:true},
});

const privacy =new schema({
userStatus: {type: String, enum: ["online", "offline", "busy"]},
blockeUsers:[Object],
activeStatus: schema.Types.Boolean,
publicStatus: schema.Types.Boolean
});

const personal = new schema({
notification: notification,
advertisment: notification,
});

const settingSchema=new schema({
userId: {type:schema.Types.ObjectId},    
profession: String,
userStatus: String,
DOBView:{type:schema.Types.Boolean,default:true},
personal: personal,
privacy:  privacy,
notification: notification
});

const SettingModel= mongo.model('settings-model',settingSchema);
module.exports=SettingModel;

// "settings": {
//     "userId":"ObjectId",
//     "personal": {
//     "notification": {
//     "mobile":"boolean",
//     "desktop": "boolean"
//     },
//     "advertising": {
//     "mobile": "boolean",
//     "desktop": "boolean"
//     }
//     },
//     "privacy": {
//     "userStatus": "Enum['online','offline','busy']",
//     "blockedUsers": "Array of ObjectIds",
//     "activeStatus": "boolean",
//     "publicStatus": "boolean"
//     },
    