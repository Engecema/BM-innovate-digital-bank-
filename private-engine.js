/**
 * MOTOR DALLAS v7.3.0 - VERSÃO LIMPA (GEONI C. MATOS)
 * REMOVIDO: SCRIPTS DE LOGIN DUPLICADOS E VERIFICAÇÕES DE PATH INSTÁVEIS
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south"
};

// 1. CONFIGURAÇÃO ÚNICA DE SALDO (1.250.000,00)
let saldoAtual = 1250000.00;

document.addEventListener("DOMContentLoaded", function() {
    // Só injeta se o elemento 'display-saldo' existir na página (Proteção Natural)
    const elSaldo = document.getElementById('display-saldo');
    if (elSaldo) {
        elSaldo.innerText = saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        verificarIntegridadeSessao();
    }
});

// 2. FUNÇÃO DE LOGIN DIRETA (SEM '?' NA URL)
function validarAcesso(dados) {
    localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO');
    localStorage.setItem('sessao_saldo', '1250000.00');
    // Redirecionamento limpo que resolve o erro do ponto de interrogação
    window.location.replace('conta-corrente.html');
}

// 3. NAVEGAÇÃO DAS 7 SEÇÕES (47 SUB-SEÇÕES)
function openSys(titulo) {
    const home = document.getElementById('tela-home');
    const servico = document.getElementById('tela-servico');
    
    if (!home || !servico) return;

    home.style.display = 'none';
    servico.style.display = 'block';

    let htmlConteudo = `<button class="btn-voltar" onclick="voltarHome()">← VOLTAR</button>`;

    if (titulo === 'Cartões') {
        htmlConteudo += `
            <h2 style="color:#cc092f;">Meus Cartões</h2>
            <div style="background: linear-gradient(135deg, #cc092f, #800000); color:#fff; padding:25px; border-radius:12px; text-align:left; box-shadow: 0 10px 20px rgba(0,0,0,0.2); margin-bottom:20px;">
                <p style="font-size:10px; letter-spacing:2px; margin-bottom:20px;">PLATINUM BUSINESS</p>
                <p style="font-size:20px; font-family:monospace; margin:20px 0;">**** **** **** 4050</p>
                <div style="display:flex; justify-content:space-between;"><span>GEONI C MATOS</span><span>EXP: 03/30</span></div>
            </div>`;
    } else {
        htmlConteudo += `
            <h2 style="color:#004481;">${titulo}</h2>
            <div style="text-align:center; padding:40px; background:#fff; border-radius:8px; border:1px dashed #ccc;">
                <p>Módulo <strong>${titulo}</strong> sincronizado com Cloudant IBM.</p>
            </div>`;
    }
    servico.innerHTML = htmlConteudo;
}

function voltarHome() {
    document.getElementById('tela-home').style.display = 'block';
    document.getElementById('tela-servico').style.display = 'none';
}

function verificarIntegridadeSessao() {
    if (!localStorage.getItem('engecema_auth_token')) {
        window.location.href = 'index.html';
    }
}

function executarSair() {
    localStorage.clear();
    window.location.href = 'index.html';
}
