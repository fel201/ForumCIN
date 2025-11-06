async function addComment(event) {
    event.preventDefault();
    const textarea_DOM = document.getElementById("text101");
    const comment_content = textarea_DOM.value;
    const comment_user_id = JSON.parse(localStorage.getItem("user_id"));
    const pathname = window.location.pathname.split('/');
    const post_id = pathname[pathname.length-2];
    console.log(post_id);
    const comment_post_req = await fetch(`/api/submissions/${post_id}/comments/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            comment_content: comment_content,
            user_id: comment_user_id,
        })
    });
    if(!comment_post_req.ok) {
        const fucking_shit = await comment_post_req.json();
        console.log(fucking_shit);
        throw new Error("An error has occured in the comment POST Request: " + comment_post_req.status);
    }
    window.location.href = '/submissions/' + post_id;
}

document.addEventListener("submit", event => addComment());