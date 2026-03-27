/**
 * MOTOR DE SEGURANÇA DALLAS - ENGECEMA
 * Versão: 5.3.0 - FIX: Redirecionamento para Conta Corrente
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south",          
    propertyName: "cloudant_endpoint"
};

// 1. INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", function() {
    console.log("Motor Dallas Ativo - Destino: Conta Corrente");
    verificarIntegridadeSessao();
});

// 2. FUNÇÃO DE LOGIN (VALIDA AS 4 ABAS E DIRECIONA PARA CONTA CORRENTE)
async function validarAcesso(event) {
    if (event) event.preventDefault();

    const ag = document.getElementById('ag') ? document.getElementById('ag').value : "";
    const ct = document.getElementById('ct') ? document.getElementById('ct').value : "";
    const senha = document.getElementById('senha') ? document.getElementById('senha').value : "";
    const senhaConf = document.getElementById('senha_conf') ? document.getElementById('senha_conf').value : "";

    // Validação de Senhas Iguais
    if (senha !== senhaConf) {
        alert("As senhas não conferem!");
        return;
    }

    // Validação de Preenchimento
    if (ag.length < 3 || ct.length < 4) {
        alert("Agência ou Conta inválida.");
        return;
    }

    // Geração do Token de Segurança
    localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO');
    localStorage.setItem('last_login', new Date().toISOString());

    // CORREÇÃO DO DIRECIONAMENTO: Agora vai para Conta Corrente
    console.log("Redirecionando para área logada...");
    window.location.href = 'conta-corrente.html';
}

// 3. VERIFICADOR DE INTEGRIDADE (BLOQUEIA ACESSO DIRETO)
function verificarIntegridadeSessao() {
    const token = localStorage.getItem('engecema_auth_token');
    const path = window.location.pathname;

    // Protege as páginas internas contra acesso sem login
    const paginasProtegidas = ['conta-corrente.html', 'gestao.html'];
    const precisaEjetar = paginasProtegidas.some(p => path.includes(p)) && token !== 'TOKEN_VALIDO_PRODUCAO';

    if (precisaEjetar) {
        executarSair();
    }

    // Controle visual dos botões no index.html
    const tokenAtivo = (token === 'TOKEN_VALIDO_PRODUCAO');
    const btnLogout = document.getElementById('btn-logout');
    const formLogin = document.getElementById('form-login');
    const btnPainel = document.getElementById('btn-painel');
    const areaPublica = document.getElementById('area-publica');

    if (path.includes('index.html') || path === '/' || path.includes('.io')) {
        if (tokenAtivo) {
            if(formLogin) formLogin.style.display = 'none';
            if(btnLogout) btnLogout.style.display = 'block';
            if(btnPainel) btnPainel.style.display = 'block';
            if(areaPublica) areaPublica.style.display = 'none';
        } else {
            if(formLogin) formLogin.style.display = 'flex';
            if(btnLogout) btnLogout.style.display = 'none';
            if(btnPainel) btnPainel.style.display = 'none';
            if(areaPublica) areaPublica.style.display = 'block';
        }
    }
}

// 4. LOGOUT E LIMPEZA
function executarSair() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'index.html';
}

// 5. BUSCA DE ENDPOINT IBM CLOUDANT
async function obterEndpointCloudant() {
    try {
        const url = `https://${IBM_CONFIG.region}://{IBM_CONFIG.guid}/collections/default/properties/${IBM_CONFIG.propertyName}`;
        const response = await fetch(url, { headers: { 'X-Custom-Auth': IBM_CONFIG.apikey } });
        const data = await response.json();
        return data.value;
    } catch (e) {
        console.error("Erro ao conectar IBM Cloud:", e);
    }
}
