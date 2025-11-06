function addCommentButtonHyperTextRef() {
    const post_id = window.location.pathname.split("/").pop();
    const comment_button_element = document.getElementById("commentButton");
    comment_button_element.setAttribute("href", `/submissions/${post_id}/comment`);
};

async function renderPost() {
    try {        
        const post_id = window.location.pathname.split("/").pop();
        const fetch_url = "/api/submissions/" + post_id;

        const request = await fetch(fetch_url)
        if(!request.ok) {
            return new Error(
            `HTTP Request to retrieve the post failed: `+ request.status
            );
        }
        const post = await request.json();


        const post_container = document.getElementById("postContainer");
        const title_header = document.createElement("h3");

        title_header.innerHTML = post.submission_data.title;
        post_container.appendChild(title_header);

        const text = document.createElement("p");
        text.innerHTML = post.submission_data.content;

        post_container.appendChild(text);
        const author_id = post.submission_data.user_id;
        const created_at = post.submission_data.created_at;
        const retrieve_user_inf = await fetch("/api/users/" + author_id);
        if(!request.ok) {
            throw new Error(
                "An error has occured while retrieving user information from the post. Status: "
                 + request.status 
            );
        }
        author_information = await retrieve_user_inf.json();
        const user_inf = document.createElement("b");
        user_inf.setAttribute("class", "post_user_information");
        user_inf.innerHTML = author_information.username + " " + created_at;
        post_container.appendChild(user_inf);
    }
    catch(err) {
        console.log('An error has occurred: ' + err);
    }
};


async function renderComments() {
    const post_id = window.location.pathname.split("/").pop();
    const request = await fetch(`/api/submissions/${post_id}/comments`);
    const inf = await request.json();
    console.log(inf);   
    // 
    if(inf.comment.length != 0) {
        for(let i = 0; i < inf.comment.length; i++) {
            const comment_container = document.createElement("div");
            comment_container.setAttribute("class", "commentContainer");
            
            const content = document.createElement("p");
            content.innerHTML = inf.comment[i].content;
            
            // retrieve user's nickname
            const user_req = await fetch(`/api/users/${inf.comment[i].user_id}`);
            const user = await user_req.json();
            
            const author_inf = document.createElement('b');
            author_inf.setAttribute('class', 'post_user_information');
            author_inf.innerHTML = user.username + " " + inf.comment[i].created_at;
            
            comment_container.appendChild(content);
            comment_container.appendChild(author_inf);
            document.body.appendChild(comment_container);
        }
    }
};

renderPost()
.then(() => renderComments())
.then(() => addCommentButtonHyperTextRef);