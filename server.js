import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
import ejs from 'ejs'
import pg from 'pg'
const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    password: 'felipe0102',
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



// main route '/'
app.get('/', (req, res) => {
    res.render('blog1.html');
});

// submissions
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
        res.status(200).json({request: "funciono mn"});
    }
    catch {
        res.status(500).json({error: "POST Request Failed"});
    }
}); 

app.get('/submissions/:commentId', async (req, res) => {
    var id_number = req.params.commentId;
    try {
        const comment_information = await pool.query
        ("SELECT content FROM submissions WHERE id = $1", [id_number]);
        console.log(comment_information.rows[0].content);
        res.status(200).send(comment_information.rows[0].content);
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

// api routes
app.get('/api/submissions', async (req, res) => {
    console.log("Triggered?");
    try {
        const all_submissions = await pool.query("SELECT * FROM submissions");
        console.log(all_submissions.rows);
        res.status(200).json(all_submissions.rows);
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Erro :)");
    }
});
app.get('/api/submissions/:commentId', async (req, res) => {
    var comment_id = req.params.commentId;

    try {
        const submission = await pool.query
        ("SELECT * FROM submissions WHERE id = $1", [comment_id]);
        res.status(200).json({
            submission_data: {
                title: submission.rows[0].title,
                content: submission.rows[0].content,
                id: submission.rows[0].id,
            }
        });
    }
    catch {
        res.status(500).json({Error: "GET Request Failed"});
    }
})
// TO-DO: Fix the comment deletion logic 
// and also send a proper response message and status
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
// redirect to success after receiving the form
app.get('/success', (req, res) => {
    res.render('message.html');
}) 
let port = 5000;
let hostname = '127.0.0.1';
app.listen(port, hostname, function() {
console.log(`Server running at http://${hostname}:${port}/`);
});



