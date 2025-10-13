
async function renderPost() {
    const current_url = window.location.href;
    const last_slash_index = current_url.lastIndexOf("/");
    
    const post_id = (current_url[last_slash_index+1]).toString();
    const fetch_url = "/api/submissions/" + post_id;
    
    const request = await fetch(fetch_url)
    const post = await request.json();
    const post_container = document.getElementById("postContainer");

    const title_header = document.createElement("h3");
    title_header.innerHTML = post.submission_data.title;
    post_container.appendChild(title_header);
    const text = document.createElement("p");
    text.innerHTML = post.submission_data.content;
    post_container.appendChild(text);
}

setTimeout(renderPost);
/*
  submission_data: {
                title: submission.rows[0].title,
                content: submission.rows[0].content,
                id: submission.rows[0].id,
                created_at: submission.rows[0].created_at,
            }
*/