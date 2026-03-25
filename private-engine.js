/**
 * MOTOR PRIVADO ENGECEMA - ESPELHAMENTO RH
 */

document.addEventListener("DOMContentLoaded", function() {
    verificarEstadoSessao();
});

function handleLogin(event) {
    event.preventDefault();
    
    const ag = document.getElementById('agencia').value;
    const ct = document.getElementById('conta').value;

    if(ag !== "" && ct !== "") {
        // Define a sessão ativa no navegador
        localStorage.setItem('rh_session_active', 'true');
        localStorage.setItem('rh_user', ag);
        
        // Em vez de ir para uma página externa escura, 
        // ele apenas atualiza a interface para o modo "Logado"
        renderizarPainelLogado();
    }
}

function verificarEstadoSessao() {
    const isLogado = localStorage.getItem('rh_session_active');
    if (isLogado === 'true') {
        renderizarPainelLogado();
    }
}

function renderizarPainelLogado() {
    const formLogin = document.getElementById('form-login');
    const areaLogada = document.getElementById('area-logada');
    const heroSection = document.querySelector('.hero h1');

    if(formLogin) formLogin.style.display = 'none';
    if(areaLogada) areaLogada.style.display = 'flex';
    
    // Altera o título para confirmar que entrou no painel de RH
    if(heroSection) {
        heroSection.innerHTML = "Painel de <b>Gestão RH</b> Ativo";
    }
}

function logout() {
    // Limpa tudo e volta ao estado inicial
    localStorage.removeItem('rh_session_active');
    localStorage.removeItem('rh_user');
    
    // Recarrega a página para limpar o cache visual
    window.location.reload();
}
