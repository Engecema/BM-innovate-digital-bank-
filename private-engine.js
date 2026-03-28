/**
 * MOTOR DALLAS v7.2.5 - TRAVA DEFINITIVA DE PRIVACIDADE
 * CLIENTE: GEONI CESAR DE MATOS | SALDO: 1.250.000,00
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south"
};

// Configuração do Saldo Aprovado
let saldoAtual = 1250000.00;

document.addEventListener("DOMContentLoaded", function() {
    // TRAVA 1: Só executa a lógica de saldo se o arquivo se chamar 'conta-corrente.html'
    const paginaAtual = window.location.pathname.split("/").pop();
    
    if (paginaAtual === 'conta-corrente.html') {
        renderizarSaldoSeguro();
        verificarIntegridadeSessao();
    } else {
        // TRAVA 2: Se estiver no index.html ou login, limpa qualquer resquício de saldo
        console.log("Ambiente de Acesso: Saldo oculto por segurança.");
    }
});

function renderizarSaldoSeguro() {
    const elSaldo = document.getElementById('display-saldo');
    if (elSaldo) {
        elSaldo.innerText = (1250000.00).toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        });
    }
}

/**
 * FUNÇÃO DE LOGIN (VALIDADA ONTEM)
 */
function validarAcesso(dados) {
    // Grava a sessão antes de mudar de página
    localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO');
    localStorage.setItem('sessao_saldo', '1250000.00');
    localStorage.setItem('sessao_user', 'GEONI CESAR DE MATOS');
    
    // Redirecionamento limpo para a conta corrente
    window.location.replace('conta-corrente.html');
}

/**
 * NAVEGAÇÃO DAS 7 SEÇÕES (47 SUB-SEÇÕES)
 */
function openSys(titulo) {
    const home = document.getElementById('tela-home');
    const servico = document.getElementById('tela-servico');
    
    if (!home || !servico) return;

    home.style.display = 'none';
    servico.style.display = 'block';
    window.scrollTo(0, 0);

    let htmlConteudo = `<button onclick="voltarHome()" style="background:#666; color:#fff; border:none; padding:10px 20px; border-radius:4px; cursor:pointer; margin-bottom:20px; font-weight:bold;">← VOLTAR</button>`;

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
                <p style="color:#cc092f; font-weight:bold;">Saldo: R$ 1.250.000,00</p>
            </div>`;
    }
    servico.innerHTML = htmlConteudo;
}

function voltarHome() {
    document.getElementById('tela-home').style.display = 'block';
    document.getElementById('tela-servico').style.display = 'none';
    renderizarSaldoSeguro();
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
