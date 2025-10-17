const is_logged_in = JSON.parse(localStorage.getItem("is_logged_in"));
if(!is_logged_in) {
    const href_create_post = document.getElementById("href_create_post");
    href_create_post.style.display = "none";
}
async function getText() { 
    try {
        const response = await fetch('/api/submissions/');
        const data = await response.json();
        console.log(data);
        const posts = []
        for(let i = 0; i < data.length; i++) {
            // creating checkbox
            let anchor = document.createElement('a');
            anchor.setAttribute('class', 'title');
            anchor.setAttribute('id', `id${data[i].id}`);
            anchor.setAttribute('href', `/submissions/${data[i].id}`);
            let user = await fetch(`api/users/${data[i].user_id}`);
            let user_inf = await user.json();
            anchor.innerHTML = `${data[i].title} | usuário: ${user_inf.username}`;
            // adding it inside the container
            let container = document.getElementById("containerPosts");
            container.appendChild(anchor);
            // adding the line break 
            let br = document.createElement('br');
            document.body.appendChild(br);
            posts.push(anchor);
        }
        return posts
    }
    catch(err) {
        console.log('Error rendering posts: ' + err);
    }
};
async function listenToPostRightClick() {
    const posts = await getText();
    posts.forEach((element) => {
        element.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            const panel_div = document.createElement('div');
            const delete_s = document.createElement('div');
            delete_s.setAttribute('class', 'icecold');
            delete_s.innerHTML = 'Deletar post';
            panel_div.appendChild(delete_s);
            document.body.appendChild(panel_div);
        })
    })
}

listenToPostRightClick();