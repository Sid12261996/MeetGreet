const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    Url = require('./environment'),
    mongoose = require('mongoose'),
    userRoute = require('./routes/userRoute'),
    JwtToken = require('./AuthVerify/AuthVerify'),
    postRoute = require('./routes/post-route'),
    albumRoute = require('./routes/album-route'),
    settingRoute=require('./routes/settingRoute');
    app.use(cors());

//Mongo Connection
mongoose.connect(Url.env.MongoUrl || process.env.MongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch(err => console.error(err));
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//Routes
app.use('/api/user', userRoute);
app.use('/api/posts', JwtToken, postRoute);
app.use('/api/album', albumRoute);
app.use('/api/settings',JwtToken,settingRoute);
//Fake route to tst JWT
app.get('/api/protected', JwtToken, (req, res) => {
    res.send('You have successfully accessed a protected route!! JWT works!!')
});
app.get('/*', (req, res) => {
    res.sendFile('./index.html', {root: __dirname});
});

module.exports = app;
