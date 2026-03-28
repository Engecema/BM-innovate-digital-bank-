/**
 * MOTOR DALLAS v7.2.0 - CORREÇÃO DE PRIVACIDADE (SALDO OCULTO NO LOGIN)
 * CLIENTE: GEONI CESAR DE MATOS | STATUS: SEGURO
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south"
};

// --- CONFIGURAÇÃO DE SALDO ---
let saldoAtual = 1250000.00;

document.addEventListener("DOMContentLoaded", function() {
    // SÓ INJETA O SALDO SE O USUÁRIO ESTIVER NA PÁGINA 'CONTA-CORRENTE.HTML'
    if (window.location.pathname.includes('conta-corrente.html')) {
        const elSaldo = document.getElementById('display-saldo');
        if (elSaldo) {
            elSaldo.innerText = saldoAtual.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
            });
        }
        verificarIntegridadeSessao();
    } else {
        // SE ESTIVER NO INDEX (LOGIN), GARANTE QUE O SALDO NÃO SEJA EXIBIDO
        console.log("Ambiente de Login: Saldo protegido.");
    }
});

/**
 * FUNÇÃO DE LOGIN (CHAMADA PELO INDEX.HTML)
 */
function validarAcesso(dados) {
    // 1. Grava os dados da sessão
    localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO');
    localStorage.setItem('sessao_saldo', '1250000.00');
    localStorage.setItem('sessao_user', 'GEONI CESAR DE MATOS');
    
    // 2. Redireciona para a conta de forma limpa (sem ?)
    window.location.replace('conta-corrente.html');
}

/**
 * NAVEGAÇÃO INTERNA (openSys)
 */
function openSys(titulo) {
    const home = document.getElementById('tela-home');
    const servico = document.getElementById('tela-servico');
    if (!home || !servico) return;

    home.style.display = 'none';
    servico.style.display = 'block';
    window.scrollTo(0, 0);

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
        htmlConteudo += `<h2 style="color:#004481;">${titulo}</h2><p>Sincronizando módulo com IBM Cloud...</p>`;
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
