const express = require('express'),
  app = express(),
  path = require('path'),
  cors= require('cors');

app.use(cors());


app.use(express.static(path.join(__dirname+'/build')));

app.listen(process.env.PORT||5000,()=>console.log('Connected!'));

app.get('/*',(req,res)=>{
  console.log("route..!")
  res.sendFile(path.join(__dirname,'/build/index.html'));
});
