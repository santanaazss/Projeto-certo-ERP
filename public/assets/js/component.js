function carregarComponente(id, arquivo){
    fetch(arquivo)
        .then(response => response.text())
        .then(data=> {
            document.getElementById(id).innerHTML = data;
        });
}

//carregar automaticamente
document.addEventListener("DOMContentLoaded", () =>{
    carregarComponente("header", "../components/header.html");
    carregarComponente("footer", "../components/footer.html");
})
