/**
 * MOTOR DALLAS v6.3.0 - DETALHAMENTO DE MÓDULOS
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

function openSys(titulo) {
    const home = document.getElementById('tela-home');
    const servico = document.getElementById('tela-servico');
    const conteudo = document.getElementById('conteudo-dinamico');

    if (!home || !servico || !conteudo) return;

    home.style.display = 'none';
    servico.style.display = 'block';
    window.scrollTo(0, 0);

    // --- LÓGICA DE TELAS ESPECÍFICAS ---
    if (titulo === 'Pix' || titulo === 'Transferência' || titulo === 'Pagamentos') {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">${titulo}</h2>
            <p>Saldo: <strong>${saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
            <hr>
            <input type="text" id="op-chave" placeholder="Chave ou Código" style="width:100%; padding:15px; margin:10px 0; border:1px solid #ddd;">
            <input type="number" id="op-valor" placeholder="Valor R$" style="width:100%; padding:15px; border:1px solid #ddd;">
            <button onclick="processarOperacao('${titulo}')" style="background:#cc092f; color:#fff; width:100%; border:none; padding:15px; font-weight:bold; cursor:pointer;">CONFIRMAR</button>
        `;
    } 
    else if (titulo === 'Saldo e Extrato' || titulo === 'Extrato Mensal') {
        conteudo.innerHTML = `
            <h2 style="color:#004481;">Extrato Consolidado</h2>
            <div style="background:#f9f9f9; padding:15px; border-radius:8px; font-size:12px; text-align:left;">
                <p><strong>27/03/2026 - LANÇAMENTO DALLAS</strong></p>
                <div style="display:flex; justify-content:space-between;"><span>Depósito Inicial</span><span style="color:green;">+ ${saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></div>
                <hr>
                <p style="text-align:center; color:#999;">Exibindo últimos 30 dias</p>
            </div>
        `;
    }
    else if (titulo === 'Cartões') {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">Meus Cartões</h2>
            <div style="background: linear-gradient(135deg, #cc092f, #800000); color:#fff; padding:25px; border-radius:12px; text-align:left;">
                <p style="font-size:10px; letter-spacing:2px;">PLATINUM BUSINESS</p>
                <p style="font-size:18px; margin:20px 0;">**** **** **** 4050</p>
                <div style="display:flex; justify-content:space-between;"><span>GEONI C MATOS</span><span>EXP: 03/30</span></div>
            </div>
            <button style="margin-top:20px; width:100%; padding:10px; background:#fff; border:1px solid #cc092f; color:#cc092f; font-weight:bold;">BLOQUEAR CARTÃO</button>
        `;
    }
    else if (titulo === 'Tia') {
        conteudo.innerHTML = `<div style="text-align:center;"><i style="font-size:50px;">🤖</i><h2>Assistente TIA</h2><p>Como posso ajudar?</p><input type="text" style="width:100%; padding:12px; border:1px solid #ddd;"></div>`;
    } 
    else {
        // TELA PADRÃO (FALLBACK) PARA OS OUTROS ITENS
        conteudo.innerHTML = `
            <div style="text-align:center; padding:40px;">
                <h2 style="color:#cc092f;">${titulo}</h2>
                <p>Sincronizando com <strong>IBM Cloudant-yr</strong>...</p>
                <div class="loader" style="margin:20px auto; width:30px; height:30px; border:3px solid #f3f3f3; border-top:3px solid #cc092f; border-radius:50%; animation: spin 1s linear infinite;"></div>
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
    if (!valor || valor <= 0 || valor > saldoAtual) return alert("Valor inválido ou saldo insuficiente.");
    saldoAtual -= valor;
    localStorage.setItem('sessao_saldo', saldoAtual.toFixed(2));
    alert(`${tipo} realizado com sucesso!`);
    voltarHome();
}

function executarSair() { localStorage.clear(); window.location.href = 'index.html'; }
function verificarIntegridadeSessao() { if (window.location.pathname.includes('conta-corrente.html') && !localStorage.getItem('engecema_auth_token')) window.location.href = 'index.html'; }
function validarAcesso(event) { if (event) event.preventDefault(); localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO'); window.location.href = 'conta-corrente.html'; }
