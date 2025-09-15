async function getText() {
    var response = await fetch('api/submissions/texts');
    var data = await response.json();
    for(let i = 0; i < data.length; i++) {
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
setTimeout(getText, 1000);


