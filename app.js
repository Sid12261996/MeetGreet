const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    path = require('path'),
    Url = require('./environment'),
    mongoose = require('mongoose'),
    userRoute = require('./routes/userRoute')

;
app.use(cors());


//Mongo Connection

mongoose.connect(Url.env.MongoUrl || process.env.MongoUrl, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes
app.use('/api/user',userRoute);

app.use( (err,req,res,next) => {
    res.status(422).send({error: err.message});
});

app.get('/*', (req, res) => {
    res.sendFile('./index.html', {root: __dirname});
});


module.exports = app;
