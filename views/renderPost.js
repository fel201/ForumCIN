
async function renderPost() {
    try {
        const current_url = window.location.href;
        
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
    }
    catch(err) {
        console.log('An error has occurred: ' + err);
    }
}

setTimeout(renderPost);
