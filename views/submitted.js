document.getElementById("theText").addEventListener("submit", async e => {
    e.preventDefault();
    const title = e.target.titleInformation.value;
    const text = e.target.textInformation.value;
    try {
        const data = await fetch('api/submissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                text: text,
            }),
        });
        if (!data.ok) {
            throw new Error(`Server error: ${data.status}`);
        }
        console.log("Passou!");
        window.location.href = "/success";
    }
    catch (err) {
        console.log("Submission Failed", err);
    }
});

