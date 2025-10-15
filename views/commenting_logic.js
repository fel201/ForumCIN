const id = window.location.pathname.split("/").pop();
const comment_button = document.getElementById("commentButton");
comment_button.setAttribute("href", `/comment/${post_id}`);
