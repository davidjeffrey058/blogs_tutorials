const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((request, response) => {
   const num = _.random(0, 20);
   console.log(num);

   const greet = _.once(()=>{
    console.log('Hello');
   })

   greet();
   greet();

   // set header content type
   response.setHeader('Content-Type', 'text/html');

   let path = './views/';

   switch(request.url){
    case '/':
        path += 'index.html';
        response.statusCode = 200;
        break;
    case '/about':
        path += 'about.html';
        response.statusCode = 200;
        break;

    // code for redirection
    case '/about-me':
        response.statusCode = 301;
        response.setHeader('location', '/about');
        response.end();
        break;
    default:
        path += '404.html';
        response.statusCode = 404;
        break;
   }

   // send an html file
   fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            response.end();
        } else {
            // response.write(data);
            response.end(data);
        }
   });

});

server.listen(3000, 'localhost', () => {
    console.log('Listening for request on port 3000');
})