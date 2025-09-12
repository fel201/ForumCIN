import http from 'http';
import fs from 'fs';
import querystring from 'querystring';
var stored_texts = [];
let server = http.createServer(function (req, res) {
    const url = req.url;
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
    else if (req.method == "POST" && url == "/textSubmitted") {
        let body = '';
        
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let data_object = querystring.parse(body);
            fs.readFile('templates/message.html', (err, data) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text-plain'});
                    res.write('Ih, vai com calma, cara!');
                    res.end();
                    return;
                }
                stored_texts.push(data_object.textInformation);
                console.log(stored_texts);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            });
        });
    }
    else if (req.method === "GET" && url === "/submissions") {
        fs.readFile("templates/submissions.html", (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text-plain'});
                res.write('Ih, vai com calma, cara!');
                res.end();
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }
    else if (req.method === "GET" && url === "/submissions/texts") {
        console.log("entrou caralho");
        let myJsonString = JSON.stringify(stored_texts);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(myJsonString);
        res.end();
    }
    else if (req.method === "GET" && url === "/submissions_script.js") {
        fs.readFile('templates/submissions_script.js', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text-plain'});
                res.write('Ih, vai com calma ai, cara!');
                res.end()
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        });
    }
});

let port = 5000;
let hostname = '127.0.0.1';
server.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});



