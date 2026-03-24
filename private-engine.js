/**
 * ENGECEMA PRIVATE - ENGINE DALLAS
 * UNIFICAÇÃO VISUAL + DATA ENGINE (GITHUB PAGES COMPATIBLE)
 */

const ENGINE_CONFIG = {
    // Insira sua API Key com permissão MANAGER aqui
    key: "spU8hW5qypYJxNTKiv--OAndWnVsnC_f-ZjEmiK8I6wY", 
    host: "7f404dab-9bd6-4dc7-8b0b-e0e4a4283d5c-bluemix.cloudantnosqldb.appdomain.cloud"
};

// --- NÚCLEO DE DADOS (DATA ENGINE) ---
const EngecemaData = {
    getHeaders: () => {
        return {
            'Authorization': 'Basic ' + btoa("apikey:" + ENGINE_CONFIG.key),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    },

    async buscar(banco) {
        const url = `https://${ENGINE_CONFIG.host}/${banco}/_all_docs?include_docs=true`;
        try {
            const res = await fetch(url, { 
                method: 'GET', 
                headers: this.getHeaders(), 
                mode: 'cors' 
            });
            return await res.json();
        } catch (e) {
            console.error("Erro ao buscar dados:", e);
            throw e;
        }
    },

    async gravar(banco, doc) {
        const url = `https://${ENGINE_CONFIG.host}/${banco}`;
        try {
            const res = await fetch(url, { 
                method: 'POST', 
                headers: this.getHeaders(), 
                body: JSON.stringify(doc),
                mode: 'cors'
            });
            return res.ok;
        } catch (e) {
            console.error("Erro técnico de rede na gravação:", e);
            return false;
        }
    }
};

// --- NÚCLEO VISUAL (BOTÃO VERMELHO E SENHA) ---
(function() {
    const integrarSeguranca = () => {
        const loginBar = document.querySelector('.login-bar');
        const btnOk = document.querySelector('.btn-ok');

        if (loginBar && btnOk && !document.getElementById('senha-priv')) {
            // Estilização Unificada (Botão Vermelho)
            btnOk.style.cssText = "background: #cc092f !important; color: #fff !important; border: none !important; padding: 8px 20px !important; border-radius: 4px !important; cursor: pointer !important; font-weight: bold !important; transition: 0.3s !important;";
            
            loginBar.removeAttribute('onsubmit');
            loginBar.onsubmit = (e) => { e.preventDefault(); return false; };

            const s1 = document.createElement('input');
            s1.id = 'senha-priv'; s1.type = 'password'; s1.placeholder = 'Senha';
            s1.maxLength = 4;
            s1.style = "padding:8px; border:1px solid #ccc; border-radius:4px; width:80px; font-size:14px; margin-right:5px;";

            const s2 = document.createElement('input');
            s2.id = 'confirma-priv'; s2.type = 'password'; s2.placeholder = 'Confirmar';
            s2.maxLength = 4;
            s2.style = "padding:8px; border:1px solid #ccc; border-radius:4px; width:80px; font-size:14px; margin-right:5px;";

            loginBar.insertBefore(s1, btnOk);
            loginBar.insertBefore(s2, btnOk);

            btnOk.onclick = function(e) {
                e.preventDefault();
                if (s1.value.length === 4 && s1.value === s2.value) {
                    window.location.href = 'produtos.html';
                } else {
                    alert("Senhas não conferem ou incompletas.");
                    s1.value = ""; s2.value = "";
                }
            };
        }
    };
    setInterval(integrarSeguranca, 500);
})();
