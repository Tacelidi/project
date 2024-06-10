var fs = require('fs');
var path = require('path');

const dirname = path.resolve(__dirname, '..')
console.log(dirname)

import('http').then((http) => {
    const server = http.createServer(function (request, response) {
        console.log('request starting ' + request.url);
        
        var filePath = dirname + request.url;
       
        if (filePath == dirname + '/')
            filePath =  dirname + '/index.html';
        console.log(filePath)    
        var extname = path.extname(filePath);
        var contentType = 'text/html';
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;      
            case '.jpg':
                contentType = 'image/jpg';
                break;
            case '.wav':
                contentType = 'audio/wav';
                break;
        }
    
        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    fs.readFile('./404.html', function(error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    response.end(); 
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    
    })
    server.listen(8125);
    console.log('Server running at http://127.0.0.1:8125/');
})