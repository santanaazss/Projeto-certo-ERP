// 🔒 Proteção: se não estiver logado, volta pro login
if (localStorage.getItem("logado") !== "true") {
    window.location.href = "/public/pages/index.html";
}

// 👤 Mostrar email do usuário
let usuarioSalvo = localStorage.getItem("usuario");
if (usuarioSalvo) {
    usuarioSalvo = JSON.parse(usuarioSalvo);
    document.getElementById("usuario").innerText = "Logado como: " + usuarioSalvo.email;
}

// 🚪 Logout
function logout() {
    localStorage.removeItem("logado");
    window.location.href = "/public/pages/index.html";
}

//  Navegação para os Módulos
// 📂 Navegação para os Módulos
function abrirModulo(nome) {
    window.location.href = "/app/modules/" + nome + "/" + nome + ".html";
}