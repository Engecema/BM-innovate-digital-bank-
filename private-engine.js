/**
 * ENGECEMA PRIVATE - ENGINE DALLAS
 * VERSÃO DESTRAVAMENTO TOTAL (LIGHTWEIGHT FETCH)
 */

const ENGINE_CONFIG = {
    key: "spU8hW5qypYJxNTKiv--OAndWnVsnC_f-ZjEmiK8I6wY", 
    host: "7f404dab-9bd6-4dc7-8b0b-e0e4a4283d5c-bluemix.cloudantnosqldb.appdomain.cloud"
};

const EngecemaData = {
    // Busca de dados
    async buscar(banco) {
        const url = `https://${ENGINE_CONFIG.host}/${banco}/_all_docs?include_docs=true`;
        try {
            // Usamos btoa para a apikey e enviamos via Header simples
            const auth = 'Basic ' + btoa("apikey:" + ENGINE_CONFIG.key);
            const res = await fetch(url, { 
                method: 'GET', 
                headers: { 'Authorization': auth }
            });
            if (!res.ok) throw new Error("Acesso Negado");
            return await res.json();
        } catch (e) {
            console.error("Erro Engine:", e);
            throw e;
        }
    },

    // Gravação de dados
    async gravar(banco, doc) {
        const url = `https://${ENGINE_CONFIG.host}/${banco}`;
        try {
            const auth = 'Basic ' + btoa("apikey:" + ENGINE_CONFIG.key);
            const res = await fetch(url, { 
                method: 'POST', 
                headers: { 
                    'Authorization': auth,
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(doc)
            });
            return res.ok;
        } catch (e) {
            return false;
        }
    }
};

// --- NÚCLEO VISUAL (BOTÃO VERMELHO) ---
(function() {
    const integrarSeguranca = () => {
        const loginBar = document.querySelector('.login-bar');
        const btnOk = document.querySelector('.btn-ok');
        if (loginBar && btnOk && !document.getElementById('senha-priv')) {
            btnOk.style.cssText = "background: #cc092f !important; color: #fff !important; border: none !important; padding: 8px 20px !important; border-radius: 4px !important; font-weight: bold !important;";
            loginBar.removeAttribute('onsubmit');
            loginBar.onsubmit = (e) => { e.preventDefault(); return false; };
            const s1 = document.createElement('input');
            s1.id = 'senha-priv'; s1.type = 'password'; s1.placeholder = 'Senha';
            s1.maxLength = 4;
            s1.style = "padding:8px; border:1px solid #ccc; border-radius:4px; width:80px; margin-right:5px;";
            const s2 = document.createElement('input');
            s2.id = 'confirma-priv'; s2.type = 'password'; s2.placeholder = 'Confirmar';
            s2.maxLength = 4;
            s2.style = "padding:8px; border:1px solid #ccc; border-radius:4px; width:80px; margin-right:5px;";
            loginBar.insertBefore(s1, btnOk);
            loginBar.insertBefore(s2, btnOk);
            btnOk.onclick = function(e) {
                e.preventDefault();
                if (s1.value.length === 4 && s1.value === s2.value) {
                    window.location.href = 'produtos.html';
                } else {
                    alert("Senhas não conferem.");
                }
            };
        }
    };
    setInterval(integrarSeguranca, 500);
})();
