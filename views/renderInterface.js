async function displayInterface() {
    fetch("interface.html")
        .then(res => res.text())
        .then(data => document.getElementById("mainInterface").innerHTML = data);
};
if(localStorage.getItem("is_logged_in") != null) {
    const display_user_html = document.getElementById("displayUser");
    const username = localStorage.getItem("username");
    display_user_html.innerHTML(username);
};
