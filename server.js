import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
import ejs from 'ejs'
import pg from 'pg'
const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    password: 'Felipetjs123!',
    host: '127.0.0.1',
    port: 5432,
    database: 'Teste',
});

let app = express()
// without this, we would
// need to rename our index.html
// file to index.ejs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('.html', ejs.__express);
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }), express.json());


var stored_titles = [];
var stored_texts = [];
var text_string = '';

// main route '/'
app.get('/', (req, res) => {
    res.render('blog1.html');
});

app.post('/api/submissions/', async (req,res) => {
    console.log(req.body);
    var title_string = req.body.title;
    var text_string = req.body.text;
    console.log(title_string);
    console.log(text_string);
    try {
        const query_submission = await pool.query(
            "INSERT INTO submissions (title, content) VALUES ($1, $2) RETURNING *",
            [title_string, text_string]);
    }
    catch {
        res.json("TERRIBLE!");
    }
}); 

// submissions
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

// api routes
app.get('/api/submissions', async (req, res) => {
    console.log("Triggered?");
    try {
        const all_submissions = await pool.query("SELECT * FROM submissions");
        res.json(all_submissions.rows);
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Erro :)");
    }
});
app.get('/api/submissions/:commentId', async (req, res) => {
    var comment_id = req.params.commentId;

    try {
        const submission = await pool.query(`SELECT * FROM submissions WHERE id = ${comment_id}`);
        res.json(submission.rows);
    }
    catch {
        res.json({"Message": "Request Error"});
    }
})
app.delete('/api/submissions/:deleteId', (req, res) => {
    var delete_id = req.params.deleteId;
    console.log("Deu certo?");
    try {
        stored_titles.splice(delete_id, delete_id);
    }
    catch {
        console.log("o texto nem existe mn");
    }
});
// redirect success
app.get('/success', (req, res) => {
    res.render('message.html');
}) 
let port = 5000;
let hostname = '127.0.0.1';
app.listen(port, hostname, function() {
console.log(`Server running at http://${hostname}:${port}/`);
});



