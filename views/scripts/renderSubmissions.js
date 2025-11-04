const is_logged_in = JSON.parse(localStorage.getItem("is_logged_in"));
if(!is_logged_in) {
    const href_create_post = document.getElementById("href_create_post");
    href_create_post.style.display = "none";
}
// 1 - every post segment is a div !!
async function getText() { 
    try {
        const response = await fetch('/api/submissions/');
        const data = await response.json();
        console.log(data);
        const posts = []
        for(let i = 0; i < data.length; i++) {
            // creating checkbox
            let div = document.createElement('div');
            div.setAttribute('class', 'titleDiv');
            let anchor = document.createElement('a');
            anchor.setAttribute('class', 'title');
            anchor.setAttribute('id', `id${data[i].id}`);
            anchor.setAttribute('href', `/submissions/${data[i].id}`);
            let user = await fetch(`api/users/${data[i].user_id}`);
            let user_inf = await user.json();
            anchor.innerHTML = `${data[i].title} | usuário: ${user_inf.username}`;
            // adding it inside the container
            let container = document.getElementById("containerPosts");
            container.appendChild(div);
            div.appendChild(anchor);
            // adding the line break 
            let br = document.createElement('br');
            document.body.appendChild(br);
            // now i decided to simply return am object containing
            // the id of the post the user right clicked on 
            // i couldn't be arsed to find another way of doing it 
            let tmp_object = {
                post_id: data[i].id,
                post_preview: div,
            };

            posts.push(tmp_object);
        }
        return posts
    }
    catch(err) {
        console.log('Error rendering posts: ' + err);
    }
};

async function rightClickEventListener(event, element_object) {
    event.preventDefault();
    const panel_div = document.getElementsByClassName('rightClickMenuDiv');
    const delete_post_element = document.getElementById("deletePostRef");
    panel_div[0].style.display = 'block';
    element_object.post_preview.appendChild(panel_div[0]);
    // body listener so that, when the user left-clicks 
    // somewhere in the html body, the callback function
    // will hide the custom rightclick menu, if it's on the screen
    document.body.addEventListener('click', () => {
        panel_div[0].style.display = 'none';
    })
    return {
        post_id: element_object.post_id,
        delete_post_anchor: delete_post_element,
    };
}
async function deletePost(id) {
    const url = `api/submissions/${id}`;
    const request = await fetch(url, {
        method: "DELETE"
    });
    if (!request.ok) {
        throw new Error('Something bad happened while deleting this post. Status: ' + request.status);
    };
    return 'ok'
}

getText()
.then((posts) => {
    posts.forEach(element_object => {
        element_object.post_preview.addEventListener(
            'contextmenu', async event => {
                const menu_object = await rightClickEventListener(event, element_object);
                console.log(menu_object);
                menu_object.delete_post_anchor.addEventListener('click', async event => {
                    event.preventDefault();
                    await deletePost(menu_object.post_id);
                    window.location.href = '/';
                });
        })
    })
});
