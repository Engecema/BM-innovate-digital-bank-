/**
 * MOTOR DALLAS v6.9.0 - ORIGINAL RESTAURADO (GEONI C. MATOS)
 * CORREÇÃO: REDIRECIONAMENTO LIMPO E TRAVA DE SALDO NO LOGIN
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south"
};

let saldoAtual = parseFloat(localStorage.getItem('sessao_saldo') || 1250000.00);

document.addEventListener("DOMContentLoaded", function() {
    // SÓ INJETA O SALDO SE ESTIVER LOGADO (EVITA SALDO NO LOGIN)
    if (localStorage.getItem('engecema_auth_token')) {
        atualizarDisplaySaldo();
    }
    verificarIntegridadeSessao();
});

// --- FUNÇÃO DE LOGIN QUE RESOLVE O PROBLEMA DO '?' ---
function validarAcesso(dados) {
    // Grava a sessão
    localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO');
    localStorage.setItem('sessao_saldo', '1250000.00');
    
    // REDIRECIONAMENTO LIMPO (MATA O PONTO DE INTERROGAÇÃO)
    window.location.replace('conta-corrente.html');
}

function atualizarDisplaySaldo() {
    const el = document.getElementById('display-saldo');
    if (el) el.innerText = saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function openSys(titulo) {
    const home = document.getElementById('tela-home');
    const servico = document.getElementById('tela-servico');
    // SEU CÓDIGO ORIGINAL USAVA 'conteudo-dinamico'
    const conteudo = document.getElementById('conteudo-dinamico') || servico;

    if (!home || !servico || !conteudo) return;

    home.style.display = 'none';
    servico.style.display = 'block';
    window.scrollTo(0, 0);

    // --- 1. MÓDULO DE CARTÕES (VISUAL CORRIGIDO) ---
    if (titulo === 'Cartões') {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">Meus Cartões</h2>
            <div style="background: linear-gradient(135deg, #cc092f, #800000); color:#fff; padding:25px; border-radius:12px; text-align:left; position:relative; box-shadow: 0 10px 20px rgba(0,0,0,0.2); margin-bottom:20px;">
                <p style="font-size:10px; letter-spacing:2px; margin-bottom:20px;">PLATINUM BUSINESS</p>
                <p style="font-size:20px; font-family:monospace; margin:20px 0;">**** **** **** 4050</p>
                <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                    <span>GEONI C MATOS</span>
                    <span style="font-size:12px;">EXP: 03/30</span>
                </div>
            </div>
            <div style="text-align:left; background:#fff; padding:15px; border-radius:8px; border:1px solid #eee;">
                <p style="font-size:12px; margin:5px 0;"><strong>Limite total:</strong> R$ 150.000,00</p>
                <p style="font-size:12px; margin:5px 0;"><strong>Limite disponível:</strong> <span style="color:green;">R$ 85.420,00</span></p>
                <button onclick="alert('Funcionalidade de Bloqueio Temporário Ativa')" style="width:100%; margin-top:15px; padding:10px; background:none; border:1px solid #cc092f; color:#cc092f; border-radius:4px; font-weight:bold; cursor:pointer;">BLOQUEAR CARTÃO</button>
            </div>
        `;
    } 
    // --- 2. BUSCADOR DE BOLETOS (MANTIDO OK) ---
    else if (titulo === 'Buscador de Boletos') {
        conteudo.innerHTML = `
            <h2 style="color:#004481;">Buscador de Boletos (DDA)</h2>
            <p style="font-size:12px; color:#666;">CPF: 707.***.383-87</p>
            <div style="background:#fff; border:1px solid #ddd; padding:15px; border-radius:8px; text-align:left; margin-top:15px;">
                <div style="border-bottom:1px solid #eee; padding:10px 0; display:flex; justify-content:space-between; align-items:center;">
                    <div><strong>CONDOMINIO EDIFICIO DALLAS</strong><br><span style="font-size:11px; color:#999;">Venc. 10/04/2026</span></div>
                    <div style="text-align:right;"><span style="font-weight:bold; color:#cc092f;">R$ 1.450,00</span></div>
                </div>
            </div>
        `;
    }
    // --- 3. PIX / PAGAMENTOS / TRANSFERÊNCIA ---
    else if (['Pix', 'Transferência', 'Pagamentos'].includes(titulo)) {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">${titulo}</h2>
            <input type="number" id="op-valor" placeholder="Valor R$" style="width:100%; padding:15px; margin:10px 0; border:1px solid #ddd; border-radius:4px;">
            <button onclick="processarOperacao('${titulo}')" style="background:#cc092f; color:#fff; width:100%; border:none; padding:15px; font-weight:bold; cursor:pointer; border-radius:4px;">CONFIRMAR</button>
        `;
    }
    // --- 4. TIA ---
    else if (titulo === 'Tia') {
        conteudo.innerHTML = `<div style="text-align:center; padding:20px;"><i style="font-size:50px;">🤖</i><h2 style="color:#cc092f;">Assistente TIA</h2><p>Olá Geoni!</p></div>`;
    }
    // --- 5. PADRÃO (OUTROS ITENS) ---
    else {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">${titulo}</h2>
            <div style="text-align:center; padding:40px;">
                <i style="font-size:40px; color:#999; display:block;">📁</i>
                <p>Módulo <strong>${titulo}</strong> sincronizado com Cloudant-yr.</p>
            </div>
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
    if (!valor || valor <= 0 || valor > saldoAtual) return alert("Erro no valor ou saldo.");
    saldoAtual -= valor;
    localStorage.setItem('sessao_saldo', saldoAtual.toFixed(2));
    alert(`${tipo} realizado!`);
    voltarHome();
}

function executarSair() {
    localStorage.clear();
    window.location.href = 'index.html';
}

function verificarIntegridadeSessao() {
    if (window.location.pathname.includes('conta-corrente.html') && !localStorage.getItem('engecema_auth_token')) {
        window.location.href = 'index.html';
    }
}
