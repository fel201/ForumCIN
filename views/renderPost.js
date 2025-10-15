const post_id = window.location.pathname.split("/").pop();

async function renderPost() {
    try {
        const current_url = window.location.href;
        
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
            throw new Error("An error has occured while retrieving user information from the post: " + err);
        }
        author_information = await retrieve_user_inf.json();
        const user_inf = document.createElement("b");
        user_inf.setAttribute("id", "post_user_information");
        user_inf.innerHTML = author_information.username + " " + created_at;
        post_container.appendChild(user_inf);
    }
    catch(err) {
        console.log('An error has occurred: ' + err);
    }
}

setTimeout(renderPost);


