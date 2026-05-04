async function checkStatus() {
    try {
        const res = await fetch('/api/status');
        const data = await res.json();
        document.getElementById('status').innerText = data.banco;
    } catch {
        document.getElementById('status').innerText = "Erro na conexão";
    }
}
checkStatus();
