import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
import ejs from 'ejs'
<<<<<<< HEAD
=======
import pg from 'pg'
import 'dotenv/config';
const { Pool } = pg;


const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

>>>>>>> 8bea064 (improve main page and add SupaBase PostgreSQL database)
let app = express()
// without this, we would
// need to rename our index.html
// file to index.ejs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('.html', ejs.__express);
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.render('blog1.html');
});

app.post('/', (req,res) => {
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
    // TO-DO: i should handle errors correctly by sending back
    // the correct type of status depending on the type
    // of problem xd
    catch {
        res.status(500).send({ERROR: "server problem(or not)"})
    }
})

app.get('/submissions', (req, res) => {
    res.render('submissions.html'); 
});
app.get('/api/submissions/', (req, res) => {
    console.log(stored_titles);
    res.json(stored_titles);
});
app.get('/api/submissions/:commentId', (req, res) => {
    var comment_id = req.params.commentId;
    var title = stored_titles[comment_id];
    var text = stored_texts[comment_id];
    try {
        res.json( { [title]: text} );
    }
    catch {
        res.json({"Message": "Request Error"});
    }
})
// TO-DO: Fix the comment deletion logic 
// and also send a proper response message and status
app.delete('/api/submissions/:deleteId', (req, res) => {
    var delete_id = req.params.deleteId;
    console.log("Deu certo?");
    try {
        text_index = req.body;
        stored_titles.splice(text_index, text_index);
    }
    catch {
        console.log("o texto nem existe mn");
    }
});
// redirect to success after receiving the form
app.get('/success', (req, res) => {
    res.render('message.html');
}) 
let port = 5000;
let hostname = '127.0.0.1';
app.listen(port, hostname, function() {
console.log(`Server running at http://${hostname}:${port}/`);
});



