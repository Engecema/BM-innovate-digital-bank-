/**
 * MOTOR PRIVADO ENGECEMA - CONTROLE DE SESSÃO
 * Integração GitHub & IBM Cloud
 */

document.addEventListener("DOMContentLoaded", function() {
    // Proteção de página: Se tentar acessar admin sem login, volta para index
    if (window.location.pathname.includes('admin.html')) {
        const auth = localStorage.getItem('engecema_auth');
        if (auth !== 'active') {
            window.location.href = 'index.html';
        }
    }
});

// Função chamada pelo botão OK na index.html
function validarAcesso(event) {
    if(event) event.preventDefault();
    
    // Define a sessão como ativa
    localStorage.setItem('engecema_auth', 'active');
    
    // Redireciona para o painel de gestão
    window.location.href = 'admin.html';
}

// Função de Logout - Limpa tudo e sai
function executarSair() {
    // Remove as marcações de login
    localStorage.removeItem('engecema_auth');
    localStorage.clear();
    
    // Feedback ao usuário
    alert("Sessão encerrada com segurança.");
    
    // Redireciona para a home
    window.location.href = 'index.html';
}
