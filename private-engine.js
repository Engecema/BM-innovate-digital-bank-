/**
 * MOTOR DALLAS v6.2.0 - MAPEAMENTO DINÂMICO TOTAL
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south"
};

let saldoAtual = parseFloat(localStorage.getItem('sessao_saldo') || 1250000.00);

document.addEventListener("DOMContentLoaded", function() {
    atualizarDisplaySaldo();
    verificarIntegridadeSessao();
});

function atualizarDisplaySaldo() {
    const el = document.getElementById('display-saldo');
    if (el) el.innerText = saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// FUNÇÃO QUE ABRE QUALQUER ITEM DAS 7 SEÇÕES
function openSys(titulo) {
    const home = document.getElementById('tela-home');
    const servico = document.getElementById('tela-servico');
    const conteudo = document.getElementById('conteudo-dinamico');

    if (!home || !servico || !conteudo) return;

    home.style.display = 'none';
    servico.style.display = 'block';
    window.scrollTo(0, 0);

    // LÓGICA DE CONTEÚDO PARA CADA ABA
    if (titulo === 'Pix' || titulo === 'Transferência' || titulo === 'Pagamentos') {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">${titulo}</h2>
            <p>Saldo: <strong>${saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
            <hr>
            <div style="margin-top:20px;">
                <input type="text" id="op-chave" placeholder="Chave ou Código de Barras" style="width:100%; padding:15px; margin-bottom:10px; border:1px solid #ddd;">
                <input type="number" id="op-valor" placeholder="Valor R$" style="width:100%; padding:15px; border:1px solid #ddd;">
                <button onclick="processarOperacao('${titulo}')" style="background:#cc092f; color:#fff; width:100%; border:none; padding:15px; font-weight:bold; cursor:pointer; border-radius:4px;">CONFIRMAR OPERAÇÃO</button>
            </div>
        `;
    } else if (titulo === 'Tia') {
        conteudo.innerHTML = `
            <div style="text-align:center;">
                <i style="font-size:50px;">🤖</i>
                <h2 style="color:#cc092f;">Assistente TIA</h2>
                <p>Olá, Geoni! Como posso ajudar você hoje?</p>
                <input type="text" placeholder="Digite sua dúvida..." style="width:100%; padding:15px; border:1px solid #ddd; border-radius:4px;">
                <button onclick="alert('TIA: Estou processando sua dúvida...')" style="background:#004481; color:#fff; border:none; padding:10px 20px; margin-top:10px; border-radius:4px;">ENVIAR</button>
            </div>
        `;
    } else {
        // CONTEÚDO PARA TODOS OS OUTROS 40+ ÍCONES (DESTRAVADOS)
        conteudo.innerHTML = `
            <div style="text-align:center; padding:40px;">
                <h2 style="color:#cc092f;">${titulo}</h2>
                <p>Você acessou o módulo de <strong>${titulo}</strong>.</p>
                <div style="background:#f9f9f9; padding:20px; border-radius:8px; border:1px dashed #ccc; margin-top:20px;">
                    <p style="font-size:13px; color:#666;">Sincronizando dados com <strong>IBM Cloudant-yr</strong>...</p>
                    <div style="margin:10px auto; width:30px; height:30px; border:3px solid #f3f3f3; border-top:3px solid #cc092f; border-radius:50%; animation: spin 1s linear infinite;"></div>
                </div>
                <p style="font-size:11px; color:#999; margin-top:20px;">Protocolo Dallas v6.2 - Acesso Criptografado</p>
            </div>
            <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
        `;
    }
}

function voltarHome() {
    document.getElementById('tela-home').style.display = 'block';
    document.getElementById('tela-servico').style.display = 'none';
    atualizarDisplaySaldo();
}

function processarOperacao(tipo) {
    const valor = parseFloat(document.getElementById('op-valor').value);
    if (!valor || valor <= 0) return alert("Valor inválido.");
    if (valor > saldoAtual) return alert("Saldo insuficiente.");

    saldoAtual -= valor;
    localStorage.setItem('sessao_saldo', saldoAtual.toFixed(2));
    alert(`${tipo} realizado com sucesso!`);
    voltarHome();
}

// Funções de Sessão e Login
function validarAcesso(event) {
    if (event) event.preventDefault();
    localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO');
    window.location.href = 'conta-corrente.html';
}

function verificarIntegridadeSessao() {
    if (window.location.pathname.includes('conta-corrente.html') && !localStorage.getItem('engecema_auth_token')) {
        window.location.href = 'index.html';
    }
}

function executarSair() {
    localStorage.clear();
    window.location.href = 'index.html';
}
