/* PRIVATE-ENGINE.JS - MOTOR DE SENHA DALLAS */
(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        #aba-br-private { position:fixed; top:0; right:0; width:410px; height:100vh; background:#111; z-index:9999999; border-left:2px solid #c5a059; padding:60px 40px; color:#fff; display:flex; flex-direction:column; box-shadow:-25px 0 80px #000; font-family:Arial; box-sizing:border-box; }
        .in-br { width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:32px; text-align:center; letter-spacing:15px; margin:30px 0; outline:none; border-radius:4px; }
        .bt-br { width:100%; padding:22px; background:#cc092f; color:#fff; border:none; font-weight:bold; text-transform:uppercase; cursor:pointer; border-radius:4px; }
    `;
    document.head.appendChild(style);

    const aba = document.createElement('div');
    aba.id = 'aba-br-private';
    let s1 = "";

    const render = (tit, sub, btn) => {
        aba.innerHTML = '<img src="logo.png" style="height:30px;margin-bottom:25px;"><h2 style="color:#c5a059;text-transform:uppercase;font-size:16px;">'+tit+'</h2><p style="color:#666;font-size:12px;">'+sub+'</p><input type="password" id="p-br" class="in-br" maxlength="4" placeholder="••••"><button class="bt-br" id="b-br">'+btn+'</button>';
        document.body.appendChild(aba);
        document.getElementById('b-br').onclick = () => {
            const val = document.getElementById('p-br').value;
            if(val.length === 4) {
                if(s1 === "") { s1 = val; render("CONFIRMAR SENHA", "Repita a senha para validar.", "CONFIRMAR"); }
                else if(val === s1) { 
                    aba.style.display="none"; 
                    // Redireciona para o destino final com o saldo real IBM
                    window.location.href = "produtos.html";
                }
                else { alert("Senhas não conferem."); location.reload(); }
            }
        };
    };
    render("SENHA DE ACESSO", "Informe sua senha de 4 dígitos para identificação digital.", "AVANÇAR");
})();
