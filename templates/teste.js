async function displayTime() {
    const request = await fetch('http://api.weatherapi.com/v1/current.json?key=5a0a631055c7426ab89194429251009&q=Brazil&aqi=no')
    const data = await request.json();
    const time = data.location.localtime;
    document.getElementById("timezoneId").innerText = time;
}
setInterval(displayTime, 100);

async function storeText() {
    value = document.getElementById("theText").value;
    let data = await fetch('/textSubmitted', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value),
    })
}