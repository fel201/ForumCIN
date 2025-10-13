import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
import ejs from 'ejs'
import pg from 'pg'
import 'dotenv/config';
import { queryObjects } from 'v8';
const { Pool } = pg;


const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
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
    res.render('main_page.html');
});

app.get('/sign-up', (req, res) => {
    res.render('sign_up.html');
});
app.get('/sign-in', (req, res) => {
    res.render('sign_in.html');
});

// submissions
app.get('/submissions/:commentId', async (req, res) => {
    res.render("post.html");
})

app.post('/api/submissions/', async (req,res) => {
    console.log(req.body);
    var title_string = req.body.title;
    var text_string = req.body.text;
    var post_user_id = req.body.user_id;
    console.log(title_string);
    console.log(text_string);
    console.log(post_user_id);
    try {
        const query_submission = await pool.query(
            "INSERT INTO submissions (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
            [title_string, text_string, post_user_id]);
        console.log(query_submission);
        res.status(200).json({request: "funciono mn"});
    }
    catch {
        res.status(500).json({error: "POST Request Failed"});
    }
}); 

app.get('/create-post', (req, res) => {
    res.render('create_post.html'); 
});

// api routes
app.post('/api/users', async (req,res) => {
    const user_body = req.body;
    console.log(user_body.username)
    try {
        const add_user = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [user_body.username, user_body.email, user_body.password]);
        console.log(add_user);
        res.status(200).json({request: "successful!"});
    }
    catch {
        res.status(500).json("FATAL ERROR");
    }
});

app.get('/api/users', async (req,res) => {
    console.log(req.query.email);
    console.log(req.query.password);
    
    try {
        const retrieve_user = await pool.query(
            "SELECT * from users WHERE email = $1 AND password = $2",
            [req.query.email, req.query.password]
        );
        console.log(retrieve_user.rows[0].username);
        res.status(200).json({
            username: retrieve_user.rows[0].username,
            user_id: retrieve_user.rows[0].user_id,
        });
    }
    catch {
        res.status(404).json("USER NOT FOUND");
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
                created_at: submission.rows[0].created_at,
            }
        });
    }
    catch {
        res.status(500).json({Error: "GET Request Failed"});
    }
});

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



