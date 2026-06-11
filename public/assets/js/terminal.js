// Injeta dinamicamente a estrutura HTML do terminal adaptável assim que a página carrega
document.addEventListener("DOMContentLoaded", () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <button class="terminal-fab" id="terminalFab" onclick="toggleTerminal()" title="Central de Consulta">
            <i class="fas fa-terminal"></i>
        </button>

        <div class="terminal-window" id="terminalWindow">
            <div class="terminal-header">
                <div class="terminal-header-icon">
                    <i class="fas fa-code-branch"></i>
                </div>
                <div class="terminal-header-info">
                    <h2>Central de Consulta Operacional</h2>
                    <p><span class="terminal-status-dot"></span> Módulo Conectado</p>
                </div>
                <button class="terminal-close-btn" onclick="toggleTerminal()"><i class="fas fa-minus"></i></button>
            </div>

            <div class="terminal-quick-bar">
                <button class="terminal-chip" onclick="sendTerminalQuick('Quais são os módulos disponíveis?')">Módulos</button>
                <button class="terminal-chip" onclick="sendTerminalQuick('Quais são os planos e preços?')">Planos</button>
                <button class="terminal-chip" onclick="sendTerminalQuick('Quais integrações estão disponíveis?')">Integrações API</button>
                <button class="terminal-chip" onclick="sendTerminalQuick('Como funciona o suporte?')">Suporte</button>
                <button class="terminal-chip" onclick="sendTerminalQuick('Como funciona o controle de estoque?')">Estoque</button>
            </div>

            <div class="terminal-messages" id="terminalMessages"></div>

            <div class="terminal-input-area">
                <div class="terminal-input-row">
                    <textarea id="terminalInput" placeholder="Digite a dúvida técnica ou operacional..." rows="1"></textarea>
                    <button id="terminalSendBtn" onclick="sendTerminalMessage()">Consultar</button>
                </div>
                <p class="terminal-hint">Terminal Automatizado · ERP Flash Interno v4.2.1</p>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    // Inicializa os mapeamentos de elementos criados dinamicamente
    window.termWindow = document.getElementById('terminalWindow');
    window.termMessages = document.getElementById('terminalMessages');
    window.termInput = document.getElementById('terminalInput');
    window.termSendBtn = document.getElementById('terminalSendBtn');

    // Configura os ouvintes de evento para o textarea digitável
    window.termInput.addEventListener('input', () => {
        window.termInput.style.height = 'auto';
        window.termInput.style.height = Math.min(window.termInput.scrollHeight, 80) + 'px';
    });

    window.termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendTerminalMessage();
        }
    });

    // Envia o primeiro log do sistema para a tela
    appendTerminalMessage('bot', `<strong>SISTEMA DE CONSULTA OPERACIONAL INTEGRADO</strong><br><br>Utilize este terminal corporativo para consultar parâmetros do ecossistema de gestão ERP Flash. Parâmetros mapeados:<ul><li><strong>Módulos operacionais</strong></li><li><strong>Modelos de contratação e tabelas</strong></li><li><strong>Protocolos de API e Suporte</strong></li></ul>Insira o termo ou use os atalhos rápidos.`);
});

// Base de Conhecimento Local do Simulador
const baseConhecimento = {
    modulos: `<strong>MÓDULOS DISPONÍVEIS NO SISTEMA:</strong><br><br><ul>
        <li><strong>Controle de Estoque:</strong> Entradas, saídas e cálculo de estoque mínimo.</li>
        <li><strong>Financeiro Inteligente:</strong> Conciliação, fluxo de caixa e DRE.</li>
        <li><strong>Fiscal e Compliance:</strong> Emissão de NF-e e arquivos SPED.</li>
        <li><strong>CRM e Vendas:</strong> Pipeline comercial e histórico de clientes.</li>
        <li><strong>Logística e WMS:</strong> Rastreamento de frotas e cubagem.</li>
        <li><strong>BI e Analytics:</strong> Relatórios industriais e análise preditiva.</li>
    </ul>`,
    planos: `<strong>TABELA DE PLANOS DE CONTRATAÇÃO (DESCONTO ANUAL DE 20%):</strong><br><br><ul>
        <li><strong>Starter:</strong> R$ 59/mês (Anual: R$ 47,20/mês) · Até 3 usuários operacionais.</li>
        <li><strong>Business:</strong> R$ 129/mês (Anual: R$ 103,20/mês) · Até 15 usuários, inclui módulo fiscal e APIs.</li>
        <li><strong>Enterprise:</strong> R$ 299/mês (Anual: R$ 239,20/mês) · Usuários ilimitados, BI dedicado e suporte prioritário.</li>
    </ul>`,
    integracoes: `<strong>INTEGRAÇÕES API DOCUMENTADAS:</strong><br><br><ul>
        <li>Disparos automáticos via <strong>WhatsApp Corporativo</strong>.</li>
        <li>Sincronização e backup em nuvem com <strong>Google Drive Enterprise</strong>.</li>
        <li>Gateways de pagamento homologados através da <strong>Stripe</strong>.</li>
        <li>Integração nativa com Marketplaces (<strong>Mercado Livre</strong>).</li>
    </ul>`,
    suporte: `<strong>PROTOCOLO DE SUPORTE TÉCNICO:</strong><br><br><ul>
        <li>Operação ininterrupta <strong>24/7/365</strong> para parceiros ativos.</li>
        <li>Tempo médio para atendimento de primeiro nível: <strong>2 minutos</strong>.</li>
        <li>Índice de resolução em primeiro contato: <strong>98%</strong>.</li>
    </ul>`,
    estoque: `<strong>CONTROLE DE ESTOQUE INDUSTRIAL:</strong><br><br>O módulo realiza o monitoramento de entradas e saídas parametrizadas por lote e almoxarifado. Emite <strong>alertas automáticos de estoque crítico</strong> e faz a integração direta com leitores de código de barras para otimizar o inventário.`,
    industrial: `<strong>MÓDULO ERP FLASH INDUSTRIAL:</strong><br><br>Desenvolvido especificamente para manufaturas, engloba:<ul>
        <li>Planejamento e Controle de Produção (PCP).</li>
        <li>Cálculo de Eficiência Global de Equipamentos (<strong>OEE</strong>).</li>
        <li>Gestão de paradas e manutenção preditiva de ativos.</li>
    </ul>`
};

function toggleTerminal() {
    window.termWindow.classList.toggle('show');
    if(window.termWindow.classList.contains('show')) {
        window.termInput.focus();
    }
}

function appendTerminalMessage(role, contentHTML) {
    const row = document.createElement('div');
    row.className = `terminal-msg-row ${role}`;

    const tag = document.createElement('div');
    tag.className = 'terminal-msg-tag';
    tag.textContent = role === 'bot' ? 'SISTEMA' : 'OPERADOR';

    const panel = document.createElement('div');
    panel.className = 'terminal-panel';
    panel.innerHTML = contentHTML;

    row.appendChild(tag);
    row.appendChild(panel);
    
    const targetContainer = window.termMessages || document.getElementById('terminalMessages');
    if (targetContainer) {
        targetContainer.appendChild(row);
        targetContainer.scrollTop = targetContainer.scrollHeight;
    }
}

function showTerminalTyping() {
    const row = document.createElement('div');
    row.className = 'terminal-msg-row bot';
    row.id = 'terminalTyping';

    const tag = document.createElement('div');
    tag.className = 'terminal-msg-tag';
    tag.textContent = 'SISTEMA';

    const panel = document.createElement('div');
    panel.className = 'terminal-panel';
    panel.innerHTML = '<div class="terminal-loading"><div class="terminal-spinner"></div>Consultando base de dados corporativa...</div>';

    row.appendChild(tag);
    row.appendChild(panel);
    window.termMessages.appendChild(row);
    window.termMessages.scrollTop = window.termMessages.scrollHeight;
}

function removeTerminalTyping() {
    const el = document.getElementById('terminalTyping');
    if (el) el.remove();
}

function sendTerminalMessage(text) {
    const msg = (text || window.termInput.value).trim();
    if (!msg) return;

    window.termInput.value = '';
    window.termInput.style.height = 'auto';
    window.termSendBtn.disabled = true;

    appendTerminalMessage('user', msg);
    showTerminalTyping();

    setTimeout(() => {
        removeTerminalTyping();
        
        const textoMinhas = msg.toLowerCase();
        let resposta = `A consulta para o termo "<strong>${msg}</strong>" foi registrada. No ambiente de produção real, este comando aciona a IA analítica. Para o Preview atual, tente palavras como: módulos, planos, integrações, suporte ou estoque.`;

        if (textoMinhas.includes('modulo') || textoMinhas.includes('disponivel')) resposta = baseConhecimento.modulos;
        else if (textoMinhas.includes('plano') || textoMinhas.includes('preco') || textoMinhas.includes('valor')) resposta = baseConhecimento.planos;
        else if (textoMinhas.includes('integra')) resposta = baseConhecimento.integracoes;
        else if (textoMinhas.includes('suporte') || textoMinhas.includes('ajuda') || textoMinhas.includes('atend')) resposta = baseConhecimento.suporte;
        else if (textoMinhas.includes('estoque') || textoMinhas.includes('inventario')) resposta = baseConhecimento.estoque;
        else if (textoMinhas.includes('industr') || textoMinhas.includes('produ')) resposta = baseConhecimento.industrial;

        appendTerminalMessage('bot', resposta);
        window.termSendBtn.disabled = false;
        window.termInput.focus();
    }, 450);
}

function sendTerminalQuick(text) {
    sendTerminalMessage(text);
}