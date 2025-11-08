var sign_in_form = document.getElementById("sign_in_form");
sign_in_form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById("email02").value;
    const password = document.getElementById("password02").value;
    const URL = "/api/session";
    try {
        var request = await fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });
        if (request.status == 404) {
            return new Error('User not found: ' + request.status);
        }
        const user_data = await request.json();
        localStorage.setItem("username", user_data.username);
        localStorage.setItem("user_id", user_data.user_id);
    }
    catch(err) {
        console.log(err);
    }
    window.location.href="/";
});

