var checkbox_array = []
async function getText() { 
    var response = await fetch('api/submissions/');
    var data = await response.json();
    for(let i = 0; i < data.length; i++) {
        // creating checkbox
        checkbox = document.createElement('input');
        checkbox_array.push(checkbox);
        checkbox_array[i].setAttribute('type', 'checkbox');
        checkbox_array[i].setAttribute('id', `check${i}`);
        document.body.appendChild(checkbox_array[i]);

        let anchor = document.createElement('a');
        anchor.setAttribute('class', 'titulo');
        anchor.setAttribute('id', `id${i}`);
        anchor.setAttribute('href', `/submissions/${i}`);
        anchor.innerHTML = `${data[i]}`;
        document.body.appendChild(anchor);
        // adding the line break 
        let br = document.createElement('br');
        document.body.appendChild(br);
    }
}
setTimeout(getText);

async function fdp() {
    var delete_elements = []
    for(let i = 0; i < checkbox_array.length; i++) {
        if (checkbox_array[i].checked) {
            delete_elements.push(i);
        }
    }
}

