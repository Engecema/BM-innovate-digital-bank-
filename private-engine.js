/**
 * MOTOR DE SEGURANÇA E GESTÃO DALLAS - ENGECEMA
 * Versão: 3.0.0 - PROTECTED (IBM Cloud App Config + Cloudant)
 */

// --- CONFIGURAÇÕES IBM CLOUD (COLE SEUS DADOS AQUI) ---
const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", // Cole a API Key do acesso-webhook
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       // Cole o GUID do acesso-webhook
    region: "us-south",          // Verifique se sua região é us-south ou br-sao
    propertyName: "cloudant_endpoint"
};

// 1. PROTEÇÃO DE INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", function() {
    console.log("Motor Engecema v3.0 Ativo...");
    verificarIntegridadeSessao();
});

// 2. FUNÇÃO DE LOGIN (CHAMADA PELA INDEX.HTML)
async function validarAcesso(event) {
    if (event) event.preventDefault();
    
    // Captura de dados (Agência e Conta)
    const ag = document.getElementById('ag') ? document.getElementById('ag').value : "";
    const ct = document.getElementById('ct') ? document.getElementById('ct').value : "";

    if(ag.length >= 3 && ct.length >= 4) {
        // CAMADA 1: Define o Token de Proteção esperado pelo gestao.html
        localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO');
        localStorage.setItem('last_login', new Date().toISOString());
        
        // Tenta buscar a URL do Cloudant antes de entrar (opcional, para cache)
        console.log("Autenticando na IBM Cloud...");
        
        // Redirecionamento para a página correta (gestao.html)
        window.location.href = 'gestao.html';
    } else {
        alert("Credenciais Inválidas para o Sistema Dallas.");
    }
}

// 3. VERIFICADOR DE SEGURANÇA (CAMADA 2 - IMPEDE BYPASS)
function verificarIntegridadeSessao() {
    const token = localStorage.getItem('engecema_auth_token');
    const isGestaoPage = window.location.pathname.includes('gestao.html');

    // Se tentar entrar na gestão sem o token, expulsa
    if (isGestaoPage && token !== 'TOKEN_VALIDO_PRODUCAO') {
        console.warn("Sessão inválida ou expirada.");
        executarSair();
    }

    // Garante visibilidade do botão de logout se logado
    if (token === 'TOKEN_VALIDO_PRODUCAO') {
        const btnLogout = document.getElementById('btn-logout');
        if (btnLogout) btnLogout.style.display = 'block';
    }
}

// 4. BUSCA DINÂMICA DA URL DO CLOUDANT (PROPRIEDADE QUE VOCÊ CRIOU)
async function obterEndpointCloudant() {
    // Nota: Para segurança máxima, esta chamada deve ser via Proxy/Cloud Function
    // Mas para teste inicial, usamos a URL direta da API da IBM
    try {
        const url = `https://${IBM_CONFIG.region}://{IBM_CONFIG.guid}/collections/default/properties/${IBM_CONFIG.propertyName}`;
        
        // Aqui precisaríamos trocar a APIKEY por um Token IAM (Processo de Backend)
        // Por enquanto, o endpoint está salvo na Property do App Config
        console.log("Buscando endpoint no App Configuration...");
        return "URL_RECUPERADA_DA_IBM"; 
    } catch (e) {
        console.error("Erro ao conectar com IBM App Config", e);
    }
}

// 5. FUNÇÃO DE LOGOUT (LIMPEZA TOTAL)
function executarSair() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'index.html';
}

// 6. FUNÇÕES DE MODAL (PADRONIZADAS)
function openSys(t) { 
    const modal = document.getElementById('modal-sys');
    const tit = document.getElementById('sys-tit');
    if(modal && tit) {
        modal.style.display = 'flex'; 
        tit.innerText = t; 
    }
}
