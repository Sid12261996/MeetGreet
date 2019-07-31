const schema = require('mongoose').Schema,
    Users = require('../models/userModel');

exports.Login = (req, res, next) => {



};

exports.Register = (req, res, next) => {
    Users.find({"Email": req.body.Email}).exec()
        .then(data => {
            if (data.length > 0) {

                res.json({message: "UserName or Email already Exists"});
            } else {
                bcrypt.hash(req.body.Password, 10, (err, hash) => {

                    if (err) {
                        throw err
                    }


                    RegisterUser = new Users(
                        {
                            _id: schema.Types.ObjectId,
                            Email: req.body.Email,
                            Name: req.body.Name,
                            Age: req.body.Age,
                            Gender: req.body.Gender,
                            Password: hash,
                            MobileNo:req.body.MobileNo,
                            CurrentJobPlace: req.body.CurrentJobPlace,
                            State: req.body.State,
                            City: req.body.City,
                            Country: req.body.Country,
                            Security: req.body.Security,
                            inCommunity: req.body.inCommunity,

                            JobProfile: req.body.JobProfile
                        });
                    console.log(RegisterUser);
                    RegisterUser.save().then(result => {

                        res.json({message: 'Successfully Saved', result});
                    }).catch(err => {
                        console.log(err)
                    })

                })
            }
        }).catch(err => {
        console.log(err)
    })
};
