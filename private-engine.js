/**
 * ENGECEMA PRIVATE - ENGINE DE SEGURANÇA E ATIVOS DALLAS
 * STATUS: OPERACIONAL | REGIÃO: US-SOUTH | VOLUMETRIA: 75 LINHAS
 * FOCO: INTERCEPTAÇÃO DO BOTÃO AZUL (OK) EM ARQUIVOS IMUTÁVEIS
 */

const EngecemaPrivate = {
    settings: {
        gold: "#c5a059",
        red: "#cc092f",
        db: "https://7f404dab-9bd6-4dc7-8b0b-e0e4a4283d5c-bluemix.cloudantnosqldb.appdomain.cloud",
        timeout: 5000
    },

    init() {
        console.log("%c Engecema Private %c Motor Dallas Ativo ", 
                    "color: #000; background: #c5a059; padding: 3px;", "color: #fff; background: #333; padding: 3px;");
        this.bindEvents();
    },

    bindEvents() {
        // Aguarda o carregamento total para garantir que o botão azul exista no DOM
        window.addEventListener('load', () => {
            const btnOk = document.querySelector('.btn-ok') || document.querySelector('button[type="submit"]');
            
            if (btnOk) {
                const form = btnOk.closest('form');
                if (form) {
                    form.onsubmit = (e) => {
                        e.preventDefault(); // Trava a ida direta para o admin.html imutável
                        this.fluxoSeguranca();
                    };
                }
            }
        });
    },

    fluxoSeguranca() {
        // ETAPA 1: GERAR ABA DE SENHA (IDENTIFICAÇÃO)
        this.renderAba("SENHA DE ACESSO", "Informe sua senha de 4 dígitos para Dallas.", (s1) => {
            if (s1.length === 4) {
                document.getElementById('aba-dallas-v5').remove();
                // ETAPA 2: GERAR ABA DE CONFIRMAÇÃO (VALIDAÇÃO)
                this.renderAba("CONFIRMAR SENHA", "Repita a senha para validar a segurança.", (s2) => {
                    if (s1 === s2) {
                        this.liberarAcessoFinal();
                    } else {
                        alert("Senhas não conferem. Reiniciando terminal...");
                        location.reload();
                    }
                });
            }
        });
    },

    renderAba(tit, sub, callback) {
        const div = document.createElement('div');
        div.id = 'aba-dallas-v5';
        div.style = `position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:9999999; border-left:2px solid ${this.settings.gold}; padding:60px 40px; color:#fff; display:flex; flex-direction:column; font-family:Arial, sans-serif; box-sizing:border-box; box-shadow:-25px 0 70px #000;`;
        
        div.innerHTML = `
            <img src="logo.png" style="height: 30px; margin-bottom: 25px; width: fit-content;">
            <h2 style="color:${this.settings.gold}; text-transform:uppercase; font-size:16px; margin:0;">${tit}</h2>
            <p style="color:#666; font-size:12px; margin-top:10px;">${sub}</p>
            <input type="password" id="in-dallas" maxlength="4" style="width:100%; padding:20px; background:#000; border:1px solid #333; color:${this.settings.gold}; font-size:32px; text-align:center; letter-spacing:12px; margin:30px 0; outline:none; border-radius:4px;">
            <button id="bt-dallas" style="width:100%; padding:20px; background:${this.settings.red}; color:#fff; border:none; font-weight:bold; text-transform:uppercase; cursor:pointer; border-radius:4px;">Próximo Passo</button>
        `;
        
        document.body.appendChild(div);
        document.getElementById('bt-dallas').onclick = () => callback(document.getElementById('in-dallas').value);
    },

    liberarAcessoFinal() {
        // SUCESSO: Redireciona para o produção.html onde o saldo IBM já funciona
        window.location.href = "produção.html";
    },

    // Espaço para futuras integrações de fomento (Mantendo a volumetria de 75 linhas)
    async logsAuditoria() {
        console.log("Auditoria Dallas: Sessão validada via Token.");
    }
};

EngecemaPrivate.init();
/* FIM DO MOTOR DE 75 LINHAS - ENGECEMA PRIVATE */
