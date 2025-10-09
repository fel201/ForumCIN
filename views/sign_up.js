const sign_up_form = document.getElementById("sign_up_form");

sign_up_form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById("username01").value;
    const email = document.getElementById("email01").value;
    const password = document.getElementById("password01").value;
    console.log(username);
    try {
        const request = await fetch('/api/users/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', 
            },
           body: JSON.stringify({
            username: username,
            email: email,
            password: password,
           }) 
        });
        if(!request.ok) {
            console.log(request.status);
        };
    }
    catch(err) {
        console.log(err);
    }
});