/**
 * ENGECEMA PRIVATE - MOTOR DE SERVIDOR DALLAS
 * STATUS: INJETOR DE SEGURANÇA ATIVO | VOLUMETRIA: 75 LINHAS
 * FOCO: BLOQUEIO DO BOTÃO AZUL (OK) VIA INTERFACE DINÂMICA
 */

(function() {
    const DallasEngine = {
        init() {
            // Injeta a segurança assim que o DOM estiver pronto
            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", () => this.montarPorteiro());
            } else {
                this.montarPorteiro();
            }
        },

        montarPorteiro() {
            if (document.getElementById('aba-dallas-protecao')) return;

            // 1. Injeta o Estilo Bradesco Private
            const style = document.createElement('style');
            style.innerHTML = `
                #aba-dallas-protecao { position:fixed!important; top:0!important; right:0!important; width:400px!important; height:100vh!important; background:#111!important; z-index:9999999!important; border-left:2px solid #c5a059!important; padding:60px 40px!important; box-shadow:-25px 0 70px #000!important; color:#fff!important; font-family:Arial!important; display:flex!important; flex-direction:column!important; box-sizing:border-box!important; }
                .in-dallas { width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:32px; text-align:center; letter-spacing:10px; margin:30px 0; outline:none; border-radius:4px; }
                .bt-dallas { width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; text-transform:uppercase; cursor:pointer; border-radius:4px; }
            `;
            document.head.appendChild(style);

            // 2. Cria a Aba de Senha
            const aba = document.createElement('div');
            aba.id = 'aba-dallas-protecao';
            this.renderFase1(aba);
            document.body.appendChild(aba);
        },

        renderFase1(container) {
            container.innerHTML = `
                <img src="logo.png" style="height:30px;margin-bottom:25px;">
                <h2 style="color:#c5a059;font-size:16px;">SENHA DE ACESSO</h2>
                <p style="color:#666;font-size:12px;">Identificação Dallas requerida. Informe sua senha de 4 dígitos.</p>
                <input type="password" id="p1" class="in-dallas" maxlength="4" placeholder="••••">
                <button class="bt-dallas" id="go-f2">AVANÇAR</button>
            `;
            document.getElementById('go-f2').onclick = () => {
                const v1 = document.getElementById('p1').value;
                if(v1.length === 4) this.renderFase2(container, v1);
            };
        },

        renderFase2(container, senhaAnterior) {
            container.innerHTML = `
                <img src="logo.png" style="height:30px;margin-bottom:25px;">
                <h2 style="color:#c5a059;font-size:16px;">CONFIRMAR SENHA</h2>
                <p style="color:#666;font-size:12px;">Repita a senha para validar o terminal.</p>
                <input type="password" id="p2" class="in-dallas" maxlength="4" placeholder="••••">
                <button class="bt-dallas" id="go-end">CONFIRMAR E ENTRAR</button>
            `;
            document.getElementById('go-end').onclick = () => {
                const v2 = document.getElementById('p2').value;
                if(v2 === senhaAnterior) {
                    container.style.display = "none"; // Libera o site original (botão azul)
                } else {
                    alert("Senhas não conferem!");
                    this.renderFase1(container);
                }
            };
        }
    };

    DallasEngine.init();
})();
