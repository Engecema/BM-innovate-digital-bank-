/* 
 * MOTOR DE SEGURANÇA ENGECEMA - INJEÇÃO VIA SERVICE WORKER
 * OBJETIVO: INJETAR ABAS DE SENHA EM ARQUIVOS IMUTÁVEIS
 */

const CACHE_NAME = 'engecema-private-v5';

self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // INTERCEPTA INDEX E ADMIN PARA INJETAR AS ABAS
    if (url.pathname.endsWith('index.html') || url.pathname.endsWith('/') || url.pathname.endsWith('admin.html')) {
        event.respondWith(
            fetch(event.request).then(async (response) => {
                let html = await response.text();
                
                // CÓDIGO DAS ABAS QUE SERÁ INJETADO DINAMICAMENTE
                const scriptInjetado = `
                <script>
                (function() {
                    window.addEventListener('load', function() {
                        const btnOk = document.querySelector('.btn-ok');
                        if (btnOk) {
                            btnOk.parentElement.onsubmit = function(e) {
                                e.preventDefault();
                                mostrarAbaSenha();
                            };
                        }
                    });

                    function mostrarAbaSenha() {
                        const div = document.createElement('div');
                        div.style = "position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:999999; border-left:2px solid #c5a059; padding:50px; color:#fff; display:flex; flex-direction:column; font-family:Arial;";
                        div.innerHTML = '<h2 style="color:#c5a059">SENHA DE ACESSO</h2><p style="color:#666;font-size:12px;">Informe sua senha de 4 dígitos.</p><input type="password" id="s1" maxlength="4" style="width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:30px; text-align:center; margin:30px 0;"><button id="bt1" style="width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; cursor:pointer;">AVANÇAR</button>';
                        document.body.appendChild(div);
                        document.getElementById('bt1').onclick = function() {
                            if(document.getElementById('s1').value.length === 4) {
                                const pass = document.getElementById('s1').value;
                                div.remove();
                                mostrarAbaConfirmar(pass);
                            }
                        };
                    }

                    function mostrarAbaConfirmar(original) {
                        const div = document.createElement('div');
                        div.style = "position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:999999; border-left:2px solid #c5a059; padding:50px; color:#fff; display:flex; flex-direction:column; font-family:Arial;";
                        div.innerHTML = '<h2 style="color:#c5a059">CONFIRMAR SENHA</h2><p style="color:#666;font-size:12px;">Repita a senha para validar.</p><input type="password" id="s2" maxlength="4" style="width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:30px; text-align:center; margin:30px 0;"><button id="bt2" style="width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; cursor:pointer;">CONFIRMAR E ENTRAR</button>';
                        document.body.appendChild(div);
                        document.getElementById('bt2').onclick = function() {
                            if(document.getElementById('s2').value === original) {
                                window.location.href = 'admin.html';
                            } else {
                                alert('Senhas não conferem.');
                                location.reload();
                            }
                        };
                    }
                })();
                </script>
                `;
                
                return new Response(html.replace('</body>', scriptInjetado + '</body>'), {
                    headers: { 'Content-Type': 'text/html' }
                });
            })
        );
    }
});
