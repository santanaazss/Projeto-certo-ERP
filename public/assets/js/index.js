// --- 1. PROTEÇÃO E AUTENTICAÇÃO ---
// Correção: Agora ele verifica se a página atual NÃO é a index.html antes de redirecionar.
if (localStorage.getItem("logado") !== "true" && !window.location.pathname.endsWith("index.html")) {
    window.location.href = "index.html";
}

// Mostrar email do usuário de forma segura
let usuarioSalvo = localStorage.getItem("usuario");

if (usuarioSalvo) {
    usuarioSalvo = JSON.parse(usuarioSalvo);
    let elementoUsuario = document.getElementById("usuario");
    
    // SÓ tenta alterar se o elemento existir no HTML, evitando quebrar o código!
    if (elementoUsuario) {
        elementoUsuario.innerText = usuarioSalvo.email;
    }
}

// Logout
function logout() {
    localStorage.removeItem("logado");
    window.location.href = "index.html"; // Redireciona para a tela de login
}


// --- 2. LÓGICA DO CARROSSEL ---
let slideIndex = 0;

function mudarSlide(n) {
    showSlides(slideIndex += n);
}

function irParaSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("carousel-item");
    let dots = document.getElementsByClassName("dot");

    // Prevenção: se a página não tiver carrossel, não faz nada
    if (slides.length === 0) return;

    if (n >= slides.length) { slideIndex = 0 }
    if (n < 0) { slideIndex = slides.length - 1 }

    // Esconde todos os slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    // Remove a classe ativa de todos os pontos
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    // Mostra o slide atual e marca o ponto correspondente
    slides[slideIndex].classList.add("active");
    if (dots.length > 0) {
        dots[slideIndex].classList.add("active");
    }
}

// Inicializa o carrossel automático a cada 5 segundos
setInterval(() => {
    mudarSlide(1);
}, 5000);

// Função genérica para os cards de módulo (para não dar erro ao clicar)
function abrirModulo(nomeModulo) {
    console.log("Módulo clicado: " + nomeModulo);
    // Aqui você pode adicionar o redirecionamento futuro, ex:
    // window.location.href = nomeModulo + ".html";
}
