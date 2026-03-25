/**
 * MOTOR DE SEGURANÇA DALLAS - VERSÃO RH ENGECEMA
 */

document.addEventListener("DOMContentLoaded", function() {
    controlarExibicao();
});

// FUNÇÃO QUE VALIDA O ACESSO E EVITA A TELA ESCURA
function validarAcesso(event) {
    event.preventDefault();
    
    // Captura os dados apenas para simular o login
    const agencia = document.getElementById('ag').value;
    const conta = document.getElementById('ct').value;

    if(agencia.length === 4 && conta.length >= 4) {
        // Grava a sessão no navegador (padrão IBM Cloud)
        localStorage.setItem('sessao_rh_engecema', 'ativa');
        
        // REDIRECIONAMENTO PARA O PAINEL EXISTENTE
        // Aqui ele vai para a sua admin.html já logado
        window.location.href = 'admin.html';
    } else {
        alert("Dados inválidos. Use o padrão Bradesco (4 dígitos agência).");
    }
}

// CONTROLA SE MOSTRA LOGIN OU BOTÃO SAIR
function controlarExibicao() {
    const sessaoValida = localStorage.getItem('sessao_rh_engecema');
    const formLogin = document.getElementById('form-login');
    const btnSair = document.getElementById('btn-sair');

    if (sessaoValida === 'ativa') {
        if(formLogin) formLogin.style.display = 'none';
        if(btnSair) btnSair.style.display = 'block';
    } else {
        if(formLogin) formLogin.style.display = 'flex';
        if(btnSair) btnSair.style.display = 'none';
        
        // Proteção: Se estiver na admin.html sem logar, volta pra home
        if (window.location.pathname.includes('admin.html')) {
            window.location.href = 'index.html';
        }
    }
}

// FUNÇÃO DO BOTÃO SAIR
function executarSair() {
    localStorage.removeItem('sessao_rh_engecema');
    alert("Desconectado com sucesso.");
    window.location.href = 'index.html';
}
