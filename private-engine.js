/* MOTOR DE SEGURANÇA ENGECEMA - GESTÃO RH */
document.addEventListener("DOMContentLoaded", function() {
    verificarAcesso();
});

function validarAcesso(event) {
    event.preventDefault();
    localStorage.setItem('engecema_auth', 'active');
    window.location.href = 'admin.html';
}

function verificarAcesso() {
    const status = localStorage.getItem('engecema_auth');
    const btnSairHeader = document.getElementById('btn-sair-header');

    if (status === 'active') {
        // Se o botão não estiver no HTML, o motor garante a exibição
        if (btnSairHeader) {
            btnSairHeader.style.display = 'block';
        }
    } else {
        if (window.location.pathname.includes('admin.html')) {
            window.location.href = 'index.html';
        }
    }
}

function executarSair() {
    localStorage.removeItem('engecema_auth');
    window.location.href = 'index.html';
}

// Funções de suporte para o Modal do Admin
function abrir(t) {
    const modal = document.getElementById('modal-br');
    if(modal) {
        modal.style.display = 'flex';
        document.getElementById('m-tit').innerText = t;
    }
}
function fechar() {
    const modal = document.getElementById('modal-br');
    if(modal) modal.style.display = 'none';
}
