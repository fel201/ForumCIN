import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
    res.render('main_page.html');
});

router.get('/sign-up', (req, res) => {
    res.render('sign_up.html');
});
router.get('/sign-in', (req, res) => {
    res.render('sign_in.html');
});

// submissions
router.get('/submissions/:commentId', async (req, res) => {
    res.render("post.html");
})

router.get('/submissions/:commentId/comment', async (req, res) => {
    res.render("create_comment.html")
})
router.get('/create-post', (req, res) => {
    res.render('create_post.html'); 
});

// redirect to success after receiving the form
router.get('/success', (req, res) => {
    res.render('message.html');
}) 

export default router;