function setCreatePostButtonHref() {
    const user = localStorage.getItem("username");
    const create_post_button = document.getElementById("href_create_post");
    if(user == "" || user == null) {
        create_post_button.setAttribute("href", "/sign-up");
        return;
    }
    create_post_button.setAttribute("href", "/create-post");
};
// anchor class = title -> class = postPreviewDiv
function createPostAnchor(post_title, post_id, username) {
    let anchor = document.createElement('a');
    anchor.setAttribute('class', 'postPreviewAnchor');
    anchor.setAttribute('href', `/submissions/${post_id}`);
    anchor.innerHTML = `${post_title} | usuário: ${username}`;
    return anchor;
};
function addLineBreak() {
    let br = document.createElement('br');
    document.body.appendChild(br);
}
// every post segment is a div !!
async function renderPostsPreviews() { 
    try {
        const response = await fetch('/api/submissions/');
        const data = await response.json();
        console.log(data);
        const posts = []
        for(let i = 0; i < data.length; i++) {
            let div = document.createElement('div');
            div.setAttribute('class', 'postPreviewDiv');
            
            let request = await fetch(`api/users/${data[i].user_id}`);
            let author_inf = await request.json();

            post_anchor = createPostAnchor(
                data[i].title, data[i].id, author_inf.username
            );
            // adding it inside the container
            let container = document.getElementById("containerPosts");
            container.appendChild(div);
            div.appendChild(post_anchor);
            addLineBreak();
            // now i decided to simply return an object containing
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

function rightClickEventListener(event, element_object) {
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

// render posts + right click menu
renderPostsPreviews()
.then((posts) => {
    posts.forEach(element_object => {
        element_object.post_preview.addEventListener(
            'contextmenu', async event => {
                const menu_object = rightClickEventListener(event, element_object);
                console.log(menu_object);
                menu_object.delete_post_anchor.addEventListener('click', async event => {
                    event.preventDefault();
                    await deletePost(menu_object.post_id);
                    window.location.href = '/?refresh=timestamp';
                });
        })
    })
});
setCreatePostButtonHref();
