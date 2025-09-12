async function teste() {
    var response = await fetch('/submissions/texts');
    var data = await response.json();
    document.getElementById("Teste").innerText = data.join('\n');
}