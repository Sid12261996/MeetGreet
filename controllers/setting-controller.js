const mongoose = require('mongoose'),
    Users = require('../models/userModel'),
    bcrypt = require('bcrypt'),
    response = require('../utils/http-utils'),
    env = require('../environment').env,
    settingsModel=require("../models/settings-model");

    const settingController= {}; 
    
settingController.createSettings= async function(userId,settings){

let Settings= new settingsModel({

userId: userId,
profession:Settings.profession,
status:Settings.status,
personal:Settings.personal,
privacy:Settings.privacy,
notification:Settings.notification

});

await Settings.save();

};

 module.exports= settingController;   

