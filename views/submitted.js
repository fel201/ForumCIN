document.getElementById("theText").addEventListener("submit", async e => {
    e.preventDefault();
    const title = e.target.titleInformation.value;
    const text = e.target.textInformation.value;
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    try {
        const data = await fetch('api/submissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                text: text,
                user_id: user_id
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
const title_element = document.getElementById("title101");
const text_element = document.getElementById("text101");

title_element.addEventListener("input", () => {
    title_element.style.height = 'auto';
    title_element.style.height = title_element.scrollHeight + 'px';
});

text_element.addEventListener("input", () => {
    text_element.style.height = 'auto';
    text_element.style.height = text_element.scrollHeight + 'px';
});