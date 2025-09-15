import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
import ejs from 'ejs'
let app = express()
// without this, we would
// need to rename our index.html
// file to index.ejs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('.html', ejs.__express);
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));

var stored_titles = [];
var stored_texts = [];
var text_string = '';


app.get('/', (req, res) => {
    res.render('blog1.html');
});

app.post('/textSubmitted', (req,res) => {
    let text_string = req.body.textInformation;
    let title_string = req.body.titleInformation;
    stored_titles.push(title_string);
    stored_texts.push(text_string);
    res.render('message.html');
}); 


app.get('/submissions/:commentId', (req, res) => {
    var id_number = req.params.commentId;
    try {
        res.send(stored_texts[id_number]);
    }
    catch {
        res.send("N funciono mn");
    }
})

app.get('/submissions', (req, res) => {
    res.render('submissions.html'); 
});
app.get('api/submissions/texts', (req, res) => {
    console.log(stored_titles);
    res.json(stored_titles);
});

let port = 5000;
let hostname = '127.0.0.1';
app.listen(port, hostname, function() {
console.log(`Server running at http://${hostname}:${port}/`);
});



//
//app.get(`/submissions/:commentId`, (req, res) => {
  //  const id_number = req.params.commentId;
    //try {
      //  res.send(stored_texts[id_number]);
    //}
    //catch {
      //  res.send("n funciono mn");
    //}
//})
