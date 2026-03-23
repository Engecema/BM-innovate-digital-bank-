/* PRIVATE-ENGINE.JS - INJEÇÃO DE CAMPOS NA BARRA DE LOGIN */
(function() {
    window.addEventListener('load', function() {
        const loginBar = document.querySelector('.login-bar');
        const btnOk = document.querySelector('.btn-ok');

        if (loginBar && btnOk) {
            // 1. Criar Campo SENHA (idêntico ao de Agência)
            const inputSenha = document.createElement('input');
            inputSenha.type = 'password';
            inputSenha.placeholder = 'Senha';
            inputSenha.required = true;
            inputSenha.maxLength = 4;
            inputSenha.style.cssText = "padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100px; font-size: 14px;";

            // 2. Criar Campo CONFIRMAR (idêntico ao de Conta)
            const inputConfirma = document.createElement('input');
            inputConfirma.type = 'password';
            inputConfirma.placeholder = 'Confirmar';
            inputConfirma.required = true;
            inputConfirma.maxLength = 4;
            inputConfirma.style.cssText = "padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100px; font-size: 14px;";

            // 3. Inserir os novos campos na barra antes do botão OK
            loginBar.insertBefore(inputSenha, btnOk);
            loginBar.insertBefore(inputConfirma, btnOk);

            // 4. Trava de segurança: só avança se as senhas forem iguais
            loginBar.onsubmit = function(e) {
                if (inputSenha.value !== inputConfirma.value) {
                    e.preventDefault();
                    alert("As senhas não conferem!");
                    return false;
                }
                // Se estiverem iguais, o onsubmit original do HTML segue para admin.html
            };
        }
    });
})();
