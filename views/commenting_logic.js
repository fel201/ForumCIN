import { localsName } from "ejs";

document.addEventListener("input", async () => {
    const comment_content = document.getElementById("text101");
    const comment_user_id = JSON.parse(localStorage.getItem("user_id"));
    const request_user_inf = await fetch(`/api/users/${comment_user_id}`);
    const user_inf = await request_user_inf.json();
    
});

