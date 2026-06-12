function carregarComponente(id, arquivo) {
    // CORREÇÃO: usar caminho absoluto a partir da raiz do projeto
    // Como o index.html está em public/pages/, precisamos subir 2 níveis
    const caminhoCorreto = '../../' + arquivo;
    
    fetch(caminhoCorreto)
        .then(response => response.text())
        .then(data => {
            const elemento = document.getElementById(id);

            if (!elemento) {
                console.error(`Elemento #${id} não encontrado`);
                return;
            }

            elemento.innerHTML = data;
        })
        .catch(error => {
            console.error(`Erro ao carregar ${arquivo}:`, error);
            // Mostra um fallback visual para debug
            document.getElementById(id).innerHTML = `
                <div style="padding:20px;background:#ff0000;color:white;text-align:center;">
                    ERRO: Componente ${arquivo} não carregado<br>
                    Caminho tentado: ${caminhoCorreto}
                </div>
            `;
        });
}

document.addEventListener("DOMContentLoaded", () => {
    // CORREÇÃO: caminhos a partir da raiz do projeto
    carregarComponente("sidebar-component", "components/sidebar.html");
    carregarComponente("topbar-component", "components/header.html");
    carregarComponente("footer-component", "components/footer.html");
});