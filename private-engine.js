/**
 * ENGECEMA PRIVATE - MOTOR DALLAS (US-SOUTH)
 * FOCO: INJEÇÃO AUTOMÁTICA DA ABA DE SENHA NA ENTRADA (BEFORE CLICK)
 * VOLUMETRIA: 75 LINHAS
 */

const PrivateEngine = {
    config: {
        gold: "#c5a059",
        red: "#cc092f",
        dbUrl: "https://7f404dab-9bd6-4dc7-8b0b-e0e4a4283d5c-bluemix.cloudantnosqldb.appdomain.cloud"
    },

    init() {
        // Injeta a primeira aba (Senha) assim que o motor inicia
        console.log("Injetando Segurança Engecema...");
        this.faseSenha();
    },

    faseSenha() {
        this.renderAba("SENHA DE ACESSO", "Informe sua senha de 4 dígitos para identificação digital.", (val) => {
            if(val.length === 4) {
                const senha1 = val;
                document.getElementById('aba-private-dynamic').remove();
                this.faseConfirmar(senha1);
            }
        });
    },

    faseConfirmar(senhaOriginal) {
        this.renderAba("CONFIRMAR SENHA", "Repita a senha para validar o acesso Dallas.", (val) => {
            if(val === senhaOriginal) {
                // SUCESSO: Recolhe a aba e libera o site original
                const aba = document.getElementById('aba-private-dynamic');
                aba.style.transform = "translateX(100%)";
                setTimeout(() => { aba.remove(); }, 500);
                
                // Opcional: Se estiver no produtos.html, já atualiza o saldo IBM
                this.sincronizarSaldo();
            } else {
                alert("As senhas não conferem. Reiniciando validação.");
                location.reload();
            }
        });
    },

    renderAba(titulo, sub, acao) {
        const div = document.createElement('div');
        div.id = 'aba-private-dynamic';
        // Estilo fixo à direita, visível imediatamente
        div.style = `position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:9999999; border-left:2px solid ${this.config.gold}; padding:60px 40px; color:#fff; display:flex; flex-direction:column; font-family:Arial, sans-serif; box-sizing:border-box; box-shadow:-25px 0 70px #000; transition: 0.5s ease;`;
        
        div.innerHTML = `
            <img src="logo.png" style="height: 30px; margin-bottom: 25px; width: fit-content;">
            <h2 style="color:${this.config.gold}; text-transform:uppercase; font-size:16px; margin:0;">${titulo}</h2>
            <p style="color:#666; font-size:12px; margin-top:10px; line-height:1.6;">${sub}</p>
            <input type="password" id="p-input" maxlength="4" style="width:100%; padding:20px; background:#000; border:1px solid #333; color:${this.config.gold}; font-size:32px; text-align:center; letter-spacing:12px; margin:30px 0; outline:none; border-radius:4px;">
            <button id="p-btn" style="width:100%; padding:20px; background:${this.config.red}; color:#fff; border:none; font-weight:bold; text-transform:uppercase; cursor:pointer; border-radius:4px;">Avançar</button>
        `;
        
        document.body.appendChild(div);
        document.getElementById('p-btn').onclick = () => acao(document.getElementById('p-input').value);
    },

    async sincronizarSaldo() {
        try {
            const res = await fetch(this.config.dbUrl);
            const data = await res.json();
            let total = 0;
            data.rows.forEach(r => { if(r.doc.valor) total += parseFloat(r.doc.valor); });
            const el = document.getElementById('valor-ibm') || document.getElementById('saldo-corrente');
            if(el) el.innerText = "R$ " + total.toLocaleString('pt-BR', {minimumFractionDigits: 2});
        } catch (e) { console.log("Offline Dallas"); }
    }
};

// Executa a injeção imediatamente
PrivateEngine.init();
