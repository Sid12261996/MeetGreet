const mongo = require('mongoose'),
    user = require('../models/userModel')

exports.Login = (req, res, next) => {
    //Add login logic here...
    //  user.find({email:req.body.email});
    res.send('Login working');
};

exports.Register = (req, res, next) => {
    // Add register logic here...
    //  user.save();
    res.send('register Working');
};
