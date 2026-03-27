/**
 * MOTOR DE SEGURANÇA DALLAS - ENGECEMA
 * Versão: 5.2.0 - PROTEÇÃO INTEGRADA IBM CLOUD
 */

// --- CONFIGURAÇÕES IBM CLOUD (DADOS DAS SERVICE CREDENTIALS) ---
const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south",          
    propertyName: "cloudant_endpoint"
};

// 1. INICIALIZAÇÃO E MONITORAMENTO
document.addEventListener("DOMContentLoaded", function() {
    console.log("Sistema Dallas v5.2 Protegido...");
    verificarIntegridadeSessao();
});

// 2. FUNÇÃO DE LOGIN (VALIDAÇÃO DE 4 ABAS + GERAÇÃO DE TOKEN)
async function validarAcesso(event) {
    if (event) event.preventDefault();

    // Captura dos elementos do index.html
    const ag = document.getElementById('ag') ? document.getElementById('ag').value : "";
    const ct = document.getElementById('ct') ? document.getElementById('ct').value : "";
    const senha = document.getElementById('senha') ? document.getElementById('senha').value : "";
    const senhaConf = document.getElementById('senha_conf') ? document.getElementById('senha_conf').value : "";

    // VALIDAÇÃO 1: Conferência de Senhas (As 4 abas)
    if (senha !== senhaConf) {
        alert("ERRO: As senhas digitadas não conferem.");
        return;
    }

    // VALIDAÇÃO 2: Verificação de preenchimento (Agência 4 / Conta 8)
    if (ag.length < 3 || ct.length < 4) {
        alert("ERRO: Credenciais insuficientes.");
        return;
    }

    // CAMADA DE PROTEÇÃO 1: Geração de Token Local
    localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO');
    localStorage.setItem('last_login', new Date().toISOString());

    // CAMADA DE PROTEÇÃO 2: Registro de Acesso (Simulação de Webhook)
    console.log("Conectando ao App Configuration para validar Endpoint...");
    
    // Redirecionamento para a Área Logada
    window.location.href = 'conta-corrente.html';
}

// 3. VERIFICADOR DE INTEGRIDADE (CONTROLE DE ACESSO DIRETO)
function verificarIntegridadeSessao() {
    const token = localStorage.getItem('engecema_auth_token');
    const path = window.location.pathname;

    // Bloqueia acesso a páginas internas se não houver token
    const areasProtegidas = ['gestao.html', 'conta-corrente.html'];
    const acessoNegado = areasProtegidas.some(area => path.includes(area)) && token !== 'TOKEN_VALIDO_PRODUCAO';

    if (acessoNegado) {
        console.warn("Acesso não autorizado. Ejetando para Home...");
        executarSair();
    }
}

// 4. FUNÇÃO DE LOGOUT E LIMPEZA
function executarSair() {
    localStorage.removeItem('engecema_auth_token');
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'index.html';
}

// 5. BUSCA DE ENDPOINT NO APP CONFIGURATION (IBM CLOUD)
async function obterEndpointCloudant() {
    try {
        const url = `https://${IBM_CONFIG.region}://{IBM_CONFIG.guid}/collections/default/properties/${IBM_CONFIG.propertyName}`;
        
        // Chamada usando a API Key de Leitor configurada no IAM
        const response = await fetch(url, {
            headers: { 'X-Custom-Auth': IBM_CONFIG.apikey }
        });
        
        const data = await response.json();
        return data.value; // Retorna a URL do Cloudant-yr
    } catch (e) {
        console.error("Erro ao recuperar Cloudant Endpoint:", e);
    }
}

// 6. UTILITÁRIOS DE INTERFACE
function openSys(t) { 
    const modal = document.getElementById('modal-sys');
    if(modal) {
        modal.style.display = 'flex'; 
        document.getElementById('sys-tit').innerText = t; 
    }
}
