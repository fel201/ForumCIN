import express from 'express';
import pg from 'pg';
import 'dotenv/config';
import { createToken } from '../token.js';
import { tokenStatus } from '../token.js';

const { Pool } = pg;
const router = express.Router();
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

router.post('/submissions/', async (req,res) => {
    console.log(req.cookies.sessionToken);
    const token = req.cookies.sessionToken
    const token_is_okay = await tokenStatus(token);

    if (!token_is_okay) {
        console.log('token n autorizado xd');
        res.status(403).json({message: 'Unauthorized token'});
        return 1;
    }

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
        if (query_submission.rows.length == 0) {
            res.sendStatus(404);
            return 1;
        }
        console.log(query_submission);
        res.status(200).json({submission_inf: query_submission.rows});
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
router.post('/session', async (req,res) => {
    
    const email = req.body.email;
    const password = req.body.password;    
    try {
        const retrieve_user = await pool.query(
            "SELECT * from users WHERE email = $1 AND password = $2",
            [email, password]
        );
        if (retrieve_user.rows.length == 0) {
            res.sendStatus(404);
        }
        else {
            const username = retrieve_user.rows[0].username;
            const user_id = retrieve_user.rows[0].user_id;
            console.log(username + user_id);
            const token = await createToken(username, user_id);
            res.cookie('sessionToken', token, {
                httpOnly: true,
            });
            res.status(200).json({
                username: username,
                user_id: user_id,
            });
        }
    }
    catch(err) {
        res.status(500).json(err);
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
            is_admin: user_query.rows[0].is_admin,
        });
    }
    catch {
        res.status(500).json("ERROR");
    }
});
// storing the comment
// "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
router.post('/submissions/:postId/comments/', async (req, res) => {
    const token = req.cookies.sessionToken;
    if (!tokenStatus(token)) {
        console.log('token n autorizado xd');
        res.status(403).json({message: 'Unauthorized token'});
        return 1;
    }
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
// retrieving comments from a post
router.get('/submissions/:postId/comments/', async (req, res) => {
    const post_id = req.params.postId;
    try {
        const select_comments = await pool.query(
            'SELECT * FROM comments WHERE post_id = $1', [post_id]
        );
        console.log(select_comments);
        res.status(200).json({comment: select_comments.rows});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: err});
    }
});

router.delete('/submissions/:postId', async (req, res) => {
    const token = req.cookies.sessionToken;
    if (!tokenStatus(token)) {
        console.log('token n autorizado xd');
        res.status(403).json({message: 'Unauthorized token'});
        return 1;
    }
    const post_id = req.params.postId;
    try {
        // deleting the comments first because 
        // there's a foreign key constraint 
        const delete_comments_query = pool.query(
            'DELETE FROM comments WHERE post_id = $1', [post_id]
        );
        const delete_post_query = pool.query(
            'DELETE FROM submissions WHERE id = $1', [post_id]
        );
        res.status(200).json({message: "Success!"});
    } 
    catch(err) {
        res.status(500).json({message: "NETWORK PROBLEM"});
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