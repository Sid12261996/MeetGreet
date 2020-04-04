// testing 
const mongo= require('mongoose');

schema = mongo.Schema;

const settingSchema=new Schema({

name: String,
profession: String,
userStatus: String,
Email: {type: schema.Types.String, required: true, minlength: 6},
CurrentPassword: {type: String, required: true, minlength: 6},
NewPassword: {type: String, required: true, minlength: 6},
ConfirmPassword: {type: String, required: true, minlength: 6},
});

const SettingModel= mongo.model('settings-model',settingSchema);

module.exports=SettingModel;
