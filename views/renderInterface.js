fetch("/interface.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("mainInterface").innerHTML = data;
        if(displayUser()) {
            // hiding the sign_in and sign_up buttons
            const sign_in = document.getElementById("signin");
            const sign_up = document.getElementById("signup");
            sign_in.style.display = 'none';
            sign_up.style.display = 'none';
            const anchor = displayLogOutButton();
            return anchor;
        }        
    })
    .then(log_out => log_out.addEventListener("click", logOutUser))
    .catch(err => console.log(`Error during the interface rendering: ` + err));

function displayUser() {
    const is_logged_in = JSON.parse(localStorage.getItem("is_logged_in"));
    if(is_logged_in) {
        const display_user_html = document.getElementById("displayUser");
        const username = localStorage.getItem("username");
        console.log(username);
        display_user_html.innerHTML = "Welcome, " + username + "!";
        console.log(is_logged_in);
        return true;
    }
    else {
        return false;
    }
}

function displayLogOutButton() {
    const log_out_anchor = document.createElement("a");
    log_out_anchor.setAttribute("id", "log_out_button");
    log_out_anchor.setAttribute("href", "/");
    log_out_anchor.innerHTML = "Sair";
    const div = document.getElementById("botoes_direita");
    div.appendChild(log_out_anchor);
    return log_out_anchor;
}

function logOutUser(event) {
    event.preventDefault();
    localStorage.setItem("is_logged_in", JSON.stringify(false));
    localStorage.setItem("username", "");
    window.location.href = "/";
}


