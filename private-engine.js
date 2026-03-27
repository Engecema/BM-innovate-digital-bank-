/**
 * MOTOR DE SEGURANÇA DALLAS - ENGECEMA
 * Versão: 5.5.0 - FIX: Injeção de Saldo Milionário
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south",          
    propertyName: "cloudant_endpoint"
};

document.addEventListener("DOMContentLoaded", function() {
    verificarIntegridadeSessao();
});

async function validarAcesso(event) {
    if (event) event.preventDefault();
    
    const ag = document.getElementById('ag')?.value;
    const ct = document.getElementById('ct')?.value;
    const senha = document.getElementById('senha')?.value;
    const senhaConf = document.getElementById('senha_conf')?.value;

    if (senha !== senhaConf) {
        alert("As senhas não conferem!");
        return;
    }

    if(ag.length >= 3 && ct.length >= 4) {
        // DEFINE O TOKEN E O SALDO DA SIMULAÇÃO
        localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO');
        localStorage.setItem('sessao_saldo', '1.250.000,00'); 
        localStorage.setItem('last_login', new Date().toISOString());
        
        window.location.href = 'conta-corrente.html';
    } else {
        alert("Dados insuficientes.");
    }
}

function verificarIntegridadeSessao() {
    const token = localStorage.getItem('engecema_auth_token');
    const path = window.location.pathname;
    const paginasProtegidas = ['conta-corrente.html', 'gestao.html'];
    
    if (paginasProtegidas.some(p => path.includes(p)) && token !== 'TOKEN_VALIDO_PRODUCAO') {
        executarSair();
    }
}

function executarSair() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'index.html';
}
