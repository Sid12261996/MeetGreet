const express  = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser= require('body-parser'),
    path = require('path'),
    nodemailer = require('nodemailer'),
    mailer = require('./routes/mailer'),
    Url = require('./environment'),
    mongoose = require('mongoose'),
    EnrolledRoute = require('./routes/EnrolledRoute')
;
app.use(cors());

const testAccount={
    user:'noratechsolutionspvtltd@gmail.com',
    pass:'noraAsdf@123'
}

//Mongo Connection

mongoose.connect(Url.env.MongoUrl||process.env.MongoUrl,{useNewUrlParser:true});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/mail', mailer);
app.use('/enroll',EnrolledRoute);

app.get('/*',(req,res)=>{
    res.sendFile('./index.html',{root:__dirname});
});





module.exports = app;
