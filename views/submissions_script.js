var checkbox_array = [];
async function getText() { 
    var response = await fetch('/api/submissions/');
    var data = await response.json();
    console.log(data);
    for(let i = 0; i < data.length; i++) {
        // creating checkbox
        let anchor = document.createElement('a');
        anchor.setAttribute('class', 'title');
        anchor.setAttribute('id', `id${data[i].id}`);
        anchor.setAttribute('href', `/submissions/${data[i].id}`);
        anchor.innerHTML = `${data[i].title}`;
        document.body.appendChild(anchor);
        // adding the line break 
        let br = document.createElement('br');
        document.body.appendChild(br);

    }
};

setTimeout(getText);


