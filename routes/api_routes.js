import express from 'express';
import pg from 'pg';
import 'dotenv/config'
const router = express.Router();
const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

router.post('/submissions/', async (req,res) => {
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

router.post('/users', async (req,res) => {
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
// login request
router.get('/users', async (req,res) => {
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
// accessing user by id
router.get("/users/:user_id", async (req, res) => {
    const user_id = req.params.user_id;

    try {
        const user_query = await pool.query
        ("SELECT * FROM users WHERE user_id = $1", [user_id]);
        res.status(200).json({
            username: user_query.rows[0].username,
            email: user_query.rows[0].email,
            created_at: user_query.rows[0].created_at,
        });
    }
    catch {
        res.status(500).json("ERROR");
    }
});
// storing comment
// `/api/submissions/${post_id}/comments/`
// "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
router.post('/submissions/:postId/comments/', async (req, res) => {
    const post_id = req.params.postId;
    const comment_content = req.body.comment_content;
    const comment_user_id = req.body.user_id;
    console.log(post_id, comment_content, comment_user_id);

    try {
        const post_query = await pool.query(
            'INSERT INTO comments (post_id, content, user_id)\
             VALUES ($1, $2, $3) RETURNING *', [post_id, comment_content, comment_user_id]);
        res.status(200).json({message: "POST Request completed successfully"});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: err});
    }
});

router.get('/submissions/:postId', async (req, res) => {
    const comment_id = req.params.postId;

    try {
        const submission = await pool.query
        ("SELECT * FROM submissions WHERE id = $1", [comment_id]);
        res.status(200).json({
            submission_data: {
                title: submission.rows[0].title,
                content: submission.rows[0].content,
                id: submission.rows[0].id,
                created_at: submission.rows[0].created_at,
                user_id: submission.rows[0].user_id,
            }
        });
    }
    catch {
        res.status(500).json({Error: "GET Request Failed"});
    }
});

router.get('/submissions', async (req, res) => {
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

export default router;