const http = require('http'),
      app = require('./app');

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port,()=>{
    console.log("Listening at Port: "+port);
});
