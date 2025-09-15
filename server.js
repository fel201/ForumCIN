import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
import ejs from 'ejs'
var stored_texts = [];
let app = express()
// without this, we would
// need to rename our index.html
// file to index.ejs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('.html', ejs.__express);
app.use(express.static(path.join(__dirname), 'public'));
app.get('/', (req, res) => {
    res.render('blog1.html');
});

app.post('/textSubmitted', (req,res) => {
    stored_texts.push(req.body);
    res.render('message.html');
}); 

app.get('/submissions', (req, res) => {
   res.render('submissions.html'); 
});

app.get('/submissions/texts', (req, res) => {
    res.json(stored_texts);
});

let port = 5000;
let hostname = '127.0.0.1';
server.listen(port, hostname, function() {
console.log(`Server running at http://${hostname}:${port}/`);
});



