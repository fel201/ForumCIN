fetch("interface.html")
    .then(res => res.text())
    .then(data => document.getElementById("mainInterface").innerHTML = data);