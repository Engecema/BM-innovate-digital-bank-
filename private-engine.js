/**
 * MOTOR DALLAS v6.6.0 - PERSONALIZAÇÃO DE FLUXOS (GEONI C. MATOS)
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

    // --- 1. TRANSAÇÕES (PIX, PAGAMENTOS, TRANSFERÊNCIAS) ---
    if (['Pix', 'Transferência', 'Pagamentos', 'Recarga', 'Saque'].includes(titulo)) {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">${titulo}</h2>
            <p>Saldo: <strong>${saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
            <input type="text" id="op-chave" placeholder="Chave ou Código de Barras" style="width:100%; padding:15px; margin:10px 0; border:1px solid #ddd; border-radius:4px;">
            <input type="number" id="op-valor" placeholder="Valor R$" style="width:100%; padding:15px; border:1px solid #ddd; border-radius:4px;">
            <button onclick="processarOperacao('${titulo}')" style="background:#cc092f; color:#fff; width:100%; border:none; padding:15px; font-weight:bold; cursor:pointer; border-radius:4px;">EFETUAR AGORA</button>
        `;
    } 
    // --- 2. AGENDAMENTOS E BUSCADOR (NOVO!) ---
    else if (titulo === 'Agendamentos' || titulo === 'Buscador de Boletos') {
        conteudo.innerHTML = `
            <h2 style="color:#004481;">${titulo}</h2>
            <div style="background:#fff; border:1px solid #ddd; padding:20px; border-radius:8px; text-align:left;">
                <p style="font-size:13px; font-weight:bold;">CONTROLE DE AGENDAMENTOS</p>
                <hr>
                <div style="padding:15px; text-align:center; color:#666;">
                    <i style="font-size:30px; display:block;">📅</i>
                    <p>Não existem boletos ou transferências agendadas para os próximos 30 dias.</p>
                </div>
                <button onclick="openSys('Pagamentos')" style="width:100%; padding:10px; background:var(--br-red); color:#fff; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">AGENDAR NOVO PAGAMENTO</button>
            </div>
        `;
    }
    // --- 3. EMPRÉSTIMOS E CRÉDITO ---
    else if (['Empréstimos', 'Credito Imobiliário', 'Limite de Credito'].includes(titulo)) {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">${titulo}</h2>
            <div style="padding:20px; border:1px solid #eee; border-radius:8px; background:#fff;">
                <p>Olá, Geoni! Analisamos seu perfil e temos uma oferta:</p>
                <div style="background:#f0f4f8; padding:20px; border-radius:8px; margin:15px 0;">
                    <span style="font-size:12px; color:#666;">VALOR DISPONÍVEL</span>
                    <div style="font-size:24px; font-weight:800; color:#004481;">R$ 450.000,00</div>
                </div>
                <button onclick="alert('Proposta enviada para análise')" style="width:100%; padding:15px; background:#004481; color:#fff; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">SOLICITAR CRÉDITO</button>
            </div>
        `;
    }
    // --- 4. CARTÕES (MANTIDO) ---
    else if (titulo === 'Cartões') {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">Meus Cartões</h2>
            <div style="background: linear-gradient(135deg, #cc092f, #800000); color:#fff; padding:25px; border-radius:12px; text-align:left; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
                <p style="font-size:10px; letter-spacing:2px; margin-bottom:20px;">PLATINUM BUSINESS</p>
                <p style="font-size:20px; font-family:monospace; margin:20px 0;">**** **** **** 4050</p>
                <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                    <span>GEONI C MATOS</span><span style="font-size:12px;">EXP: 03/30</span>
                </div>
            </div>
        `;
    }
    // --- 5. TIA (MANTIDO) ---
    else if (titulo === 'Tia') {
        conteudo.innerHTML = `<div style="text-align:center;"><i style="font-size:50px;">🤖</i><h2>Assistente TIA</h2><p>Olá Geoni! Em que posso ajudar?</p><input type="text" style="width:100%; padding:15px; border:1px solid #ddd; border-radius:4px;"></div>`;
    }
    // --- 6. PADRÃO (OUTROS ITENS) ---
    else {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">${titulo}</h2>
            <div style="background:#fff; padding:40px; border-radius:8px; border:1px solid #eee; text-align:center;">
                <i style="font-size:40px; color:#999; display:block; margin-bottom:10px;">📋</i>
                <p>O módulo <strong>${titulo}</strong> está ativo.</p>
                <p style="font-size:12px; color:#666;">Nenhum registro encontrado para Geoni Cesar de Matos neste período.</p>
                <button onclick="voltarHome()" style="margin-top:20px; background:none; border:1px solid #cc092f; color:#cc092f; padding:8px 15px; border-radius:4px; cursor:pointer; font-weight:bold;">VOLTAR AO MENU</button>
            </div>
        `;
    }
}

function voltarHome() { document.getElementById('tela-home').style.display = 'block'; document.getElementById('tela-servico').style.display = 'none'; atualizarDisplaySaldo(); }
function processarOperacao(tipo) {
    const valor = parseFloat(document.getElementById('op-valor').value);
    if (!valor || valor <= 0 || valor > saldoAtual) return alert("Erro no valor.");
    saldoAtual -= valor;
    localStorage.setItem('sessao_saldo', saldoAtual.toFixed(2));
    alert(`${tipo} realizado com sucesso!`);
    voltarHome();
}
function executarSair() { localStorage.clear(); window.location.href = 'index.html'; }
function validarAcesso(event) { if (event) event.preventDefault(); localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO'); window.location.href = 'conta-corrente.html'; }
