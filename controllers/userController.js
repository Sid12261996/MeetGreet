const mongoose = require('mongoose'),
    Users = require('../models/userModel'),
    bcrypt = require('bcrypt'),
    jwtKey = require('../environment').env.jwtKey,
    response = require('../utils/http-utils'),
    env = require('../environment').env,
    jwt = require('jsonwebtoken');
    const moment=require('moment');
 

exports.Login = (req, res) => {
// Login Check
    Users.find({Email: req.body.Email.trim()}).then(doc => {
        if (doc.length > 0) {
            let currentUser = doc[0];
            bcrypt.compare(req.body.Password, currentUser.Password, (err, result) => {
                if (err) {
                    console.log('- bcrypt error');
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
                            console.log('- jwt error');
                            res.json({message: `Token generation failed`, err})
                        }
                        if (token) {
                            res.status(200).json({message: `successful Login`, token, currentUser})
                        }
                    })
                } else {
                    res.status(401).json({message: 'Password wrong', Errors: err});
                }
            });


        } else {
            res.status(401).json({message: "Invalid Username "});
        }
    }).catch(err => {
        console.log(err);
    })


};

exports.Register = (req, res) => {
    Users.find({"Email": req.body.Email}).exec()
        .then(data => {

                if (data.length > 0) {
                    console.log('I am called');
                    res.status(400).json({message: "UserName or Email already taken"});
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
                                State: req.body.State,
                                Status: req.body.Status,
                                Profession: req.body.Profession,
                                DateOfBirth:req.body.DateOfBirth,
                                DOBView:req.body.DOBView,
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
                            res.status(400).json({message: 'Validation Errors', Errors: err})
                        })
                    });


                }
            }
        ).catch(err => {
        console.log(err);
        res.status(500).json({message: 'Validation Errors', Errors: err})
    })
};

exports.changeName= async (userId,Name) =>{

try{
     let nameResult =await Users.findByIdAndUpdate({_id:userId},{Name: Name});
     return response.Ok(nameResult);
}
catch(e){
    return response.BadRequest(e);
}

}

exports.changePassword = async (userId,currentPassword,newPassword) =>{

try{
    
    let userData= await Users.findById({_id:userId},{Password:1});
    let flag=bcrypt.compareSync(currentPassword, userData.Password) 
       if(flag){     
          let salt = bcrypt.genSaltSync(10);
          let hash = bcrypt.hashSync(newPassword, salt); 
          let passwordResult= await Users.findByIdAndUpdate({_id: userId},{Password: hash});
        return response.Ok(passwordResult);    
      }
      else{
        return response.UnAuthorized("Invalid Current Password");
      }

}
catch(e){
   return response.BadRequest(e);
}

}

exports.updateProfession =async(userId,newProfession)=>{

try{    
    let changeProfession=await Users.findByIdAndUpdate({_id:userId},{Profession:newProfession});
    return response.Ok(changeProfession);
}
catch(e){
    return response.BadRequest(e);
}

}

exports.jobProfile = async(userId,newJobProfile)=>{
try{

let addJobProfile=await Users.findByIdAndUpdate({_id:userId},{$push:{JobProfile:newJobProfile}},{safe: true, upsert: true});
return response.Ok(addJobProfile);

}
catch(e){
    return response.BadRequest(e);
}

}

exports.updateStatus =async(userId,newStatus)=>{

try{

let updatedStatus= await Users.findByIdAndUpdate({_id:userId},{Status:newStatus});
return response.Ok(updatedStatus);

}
catch(e){

return response.BadRequest(e);

}

}

exports.updateDOB =async(userId,DOB)=>{

try{

let updateDOB=await Users.findByIdAndUpdate({_id:userId},{DateOfBirth:moment.utc(DOB)});
return response.Ok(updateDOB);
}
catch(e){
return response.ServerError(e);
}

}

exports.coverPicUpdate = async (userId,NewCoverUrl) => {
    try {
        let coverPicResult = await Users.findByIdAndUpdate({_id:userId},{CoverUrl: NewCoverUrl});
        return response.Ok(coverPicResult);
    } catch (e) {
        return response.BadRequest(e);
    }
};

exports.UserPicUpdate = async (userId,NewPicUrl) => {
    try {
        let profilePicResult = await Users.findByIdAndUpdate({_id:userId},{ImageUrl: NewPicUrl});
        return response.Ok(profilePicResult);
    } catch (e) {
        return response.BadRequest(e);
    }
};

exports.fetchData = async (userId) => {
    try {
        let fetchResult = await Users.findById({_id:userId});
        return response.Ok(fetchResult);
    } catch (e) {
        return response.BadRequest(e);
    }
};
