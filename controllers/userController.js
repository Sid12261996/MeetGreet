const mongoose = require('mongoose'),
    Users = require('../models/userModel'),
    bcrypt = require('bcrypt'),
    jwtKey = require('../environment').env.jwtKey,
    jwt = require('jsonwebtoken');

exports.Login = (req, res) => {
// Login Check
    Users.find({Email: req.body.Email.trim()}).then(doc => {
        if (doc.length > 0) {
            let currentUser = doc[0];
            bcrypt.compare(req.body.Password, currentUser.Password, (err, result) => {
                if (err) {
                    res.status(401).json({message: 'Password wrong', Errors: err});
                }
                if (result) {
                    console.log(result);
                    jwt.sign({
                        Email: currentUser.Email,
                        Name: currentUser.Name,
                        MobileNo: currentUser.MobileNo
                    }, jwtKey, (err, token) => {
                        if (err) {
                            res.json({message: `Token generation failed`, err})
                        }
                        if (token) {
                            res.status(200).json({message: `successful Login`, token, currentUser})
                        }
                    })
                }
            });

        } else {
            res.json({message: "Invalid Username or Password"});
        }
    }).catch(err => {
        console.log(err);
    })


};

exports.Register = (req, res) => {
    Users.find({"Email": req.body.Email}).exec()
        .then(data => {

                if (data.length > 0) {

                    res.json({message: "UserName or Email already Exists"});
                } else {
                    bcrypt.hash(req.body.Password, 10, (err, hash) => {
                        if (err) {
                            res.status(500).json({message: `Some Error occurred,\n Details : ${err} `});
                        }
                        // You have got the hash , go ahead and save it in ur DB

                        //Step 1 Initialise Schema with values
                        let RegisterUser = new Users(
                            {
                                _id: new mongoose.Types.ObjectId(),
                                Email: req.body.Email,
                                Name: req.body.Name,
                                Age: req.body.Age,
                                Gender: req.body.Gender,
                                Password: hash,
                                MobileNo: req.body.MobileNo,
                                CurrentJobPlace: req.body.CurrentJobPlace,
                                State: req.body.State,
                                City: req.body.City,
                                Country: req.body.Country,
                                // Security: req.body.Security,
                                inCommunity: req.body.inCommunity,

                                JobProfile: req.body.JobProfile
                            });


                        // Step 2: Save It to DB
                        RegisterUser.save().then(result => {
                            console.log(result);
                            res.json({message: 'Successfully Saved', result});
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({message: 'Validation Errors', Errors: err})
                        })
                    });


                }
            }
        ).catch(err => {
        console.log(err)
    })
};
