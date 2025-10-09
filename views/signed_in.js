var sign_in_form = document.getElementById("sign_in_form");
var is_active = false;
sign_in_form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById("email02").value;
    const password = document.getElementById("password02").value;
    const params = "/api/users?" + "email=" + email + "&" + "password=" + password;
    console.log(params);
    try {
        var request = await fetch(params);
        if(request.status == 200) {
            localStorage.setItem("username", request.json());
            localStorage.setItem("is_logged_in", true);
        }
    }
    catch {
        console.log(request);
        console.log("GET Request Failed");
    }
});

