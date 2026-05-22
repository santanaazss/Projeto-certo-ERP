

/////////////////////////////
// FUNÇÃO DE CADASTRO
/////////////////////////////
function cadastrar() {
    let email = document.getElementById("cadEmail").value;
    let senha = document.getElementById("cadSenha").value;
    const mensagem = document.getElementById("mensagem");
    mensagem.innerText = "";

    // Verifica campos vazios
    if (email === "" || senha === "") {
        mensagem.innerText = "Preencha todos os campos do cadastro!";
        mensagem.style.color = "red";
        return;
    }



    // Criando objeto usuário
    let usuario = { email: email, senha: senha };

    // Salvando no localStorage
    localStorage.setItem("usuario", JSON.stringify(usuario));

    mensagem.innerText = "Cadastro realizado com sucesso!";
    mensagem.style.color = "green";

    // Limpando campos
    document.getElementById("cadEmail").value = "";
    document.getElementById("cadSenha").value = "";


        // Evita sobrescrever usuário existente
    if (localStorage.getItem("usuario")) {
        mensagem.innerText = "Usuário já cadastrado!";
        mensagem.style.color = "red";
        return;
    }

} // fim da função cadastrar











// Função de login
function fazerLogin() {
    let emailDigitado = document.getElementById("loginEmail").value;
    let senhaDigitada = document.getElementById("loginSenha").value;
    const mensagem = document.getElementById("mensagem");
    mensagem.innerText = "";

    // Verifica campos vazios
    if (emailDigitado === "" || senhaDigitada === "") {
        mensagem.innerText = "Preencha todos os campos do login!";
        mensagem.style.color = "red";
        return;
    }

    // Recuperando usuário salvo
    let usuarioSalvo = localStorage.getItem("usuario");
    if (!usuarioSalvo) {
        mensagem.innerText = "Nenhum usuário cadastrado!";
        mensagem.style.color = "red";
        return;
    }

    // Convertendo o formato JSON em objeto
    usuarioSalvo = JSON.parse(usuarioSalvo);

    console.log("Email digitado:", emailDigitado);
    console.log("Senha digitada:", senhaDigitada);
    console.log("Usuário salvo:", usuarioSalvo);

    // Comparando dados
    if (emailDigitado === usuarioSalvo.email && senhaDigitada === usuarioSalvo.senha) {
        mensagem.innerText = "Login realizado com sucesso!";
        mensagem.style.color = "green";

        // Salva status de login
        localStorage.setItem("logado", "true");

        // Redireciona para sistema (app.html)
        setTimeout(() => {
            window.location.href = "/app/app.html";
        }, 1000);
    } else {
        mensagem.innerText = "Email ou senha incorretos!";
        mensagem.style.color = "red";
    }
}