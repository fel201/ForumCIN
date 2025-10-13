var checkbox_array = []
async function getText() { 
    
    var response = await fetch('/api/submissions/');
    var data = await response.json();
    for(let i = 0; i < data.length; i++) {
        // creating checkbox
        checkbox = document.createElement('input');
        checkbox_array.push(checkbox);
        checkbox_array[i].setAttribute('type', 'checkbox');
        checkbox_array[i].setAttribute('id', `check${i}`);
        document.body.appendChild(checkbox_array[i]);

        let anchor = document.createElement('a');
        anchor.setAttribute('class', 'title');
        anchor.setAttribute('id', `id${data[i].id}`);
        anchor.setAttribute('href', `/submissions/${data[i].id}`);
        let user = localStorage.getItem("username");
        anchor.innerHTML = `${data[i].title} | usuário: ${user}`;
        // adding it inside the container
        let container = document.getElementById("containerPosts");
        container.appendChild(anchor);
        // adding the line break 
        let br = document.createElement('br');
        document.body.appendChild(br);
    }
}
setTimeout(getText);
