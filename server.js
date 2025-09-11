import http from 'http';
import fs from 'fs';
import querystring from 'querystring';
let server = http.createServer(function (req, res) {
    const url = req.url;
    if (req.method == "POST") {

        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        })
        req.on('end', () => {
            let parse = querystring.parse(body);
            let stringText = parse;
            console.log(stringText);
            fs.readFile('templates/message.html', (err, data) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            })
        })
    }
    if(url === '/') {
        fs.readFile('templates/blog1.html', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
        });
    }
    else if (url === '/teste.js') {
        fs.readFile('templates/teste.js', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text-plain'});
                res.end('Server Error');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        })
    }   
    else if (url === '/textSubmitted') {
        fs.readFile('templates/message.html', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text-plain'});
                res.end('Server Error');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end()
        })
    }
});

let port = 5000;
let hostname = '127.0.0.1';
server.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});



