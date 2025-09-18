async function displayTime() {
    const request = await fetch('http://api.weatherapi.com/v1/current.json?key=5a0a631055c7426ab89194429251009&q=Brazil&aqi=no')
    const data = await request.json();
    const time = data.location.localtime;
    document.getElementById("timezoneId").innerText = time;
}
setInterval(displayTime, 600000);

document.getElementById("theText").addEventListener("submit", async e => {
    e.preventDefault();
    const title = e.target.titleInformation.value;
    const text = e.target.textInformation.value;
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
});


