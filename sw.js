/* 
 * MOTOR DE SEGURANÇA ENGECEMA - INJEÇÃO VIA SERVICE WORKER
 * OBJETIVO: INTERCEPTAR O INDEX IMUTÁVEL E GERAR ABAS DE SENHA
 */

const CACHE_NAME = 'engecema-private-v100';

self.addEventListener('install', (e) => {
    self.skipWaiting(); 
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // INTERCEPTAÇÃO: Se carregar a página inicial (index), injetamos o script de segurança
    if (url.pathname.endsWith('index.html') || url.pathname === '/' || url.pathname.endsWith('admin.html')) {
        event.respondWith(
            fetch(event.request).then(async (response) => {
                let html = await response.text();
                
                // CÓDIGO DAS ABAS QUE SERÁ INJETADO DINAMICAMENTE NO INDEX IMUTÁVEL
                const injecaoSeguranca = `
                <script>
                (function() {
                    window.addEventListener('load', function() {
                        const btnOk = document.querySelector('.btn-ok');
                        if (btnOk) {
                            // Localiza o formulário do botão OK e trava o envio
                            const form = btnOk.closest('form');
                            form.onsubmit = function(e) {
                                e.preventDefault();
                                mostrarFase1();
                            };
                        }
                    });

                    function mostrarFase1() {
                        const aba = document.createElement('div');
                        aba.id = 'aba-porteiro';
                        aba.style = "position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:9999999; border-left:2px solid #c5a059; padding:60px 40px; color:#fff; display:flex; flex-direction:column; font-family:Arial; box-shadow:-25px 0 70px #000; box-sizing:border-box;";
                        aba.innerHTML = '<h2 style="color:#c5a059;font-size:16px;">SENHA DE ACESSO</h2><p style="color:#666;font-size:12px;">Identificação Dallas. Informe sua senha de 4 dígitos.</p><input type="password" id="p1" maxlength="4" style="width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:32px; text-align:center; letter-spacing:10px; margin:30px 0; outline:none;"><button id="bt-next" style="width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; cursor:pointer; text-transform:uppercase;">Avançar</button>';
                        document.body.appendChild(aba);

                        document.getElementById('bt-next').onclick = function() {
                            const val1 = document.getElementById('p1').value;
                            if(val1.length === 4) {
                                aba.remove();
                                mostrarFase2(val1);
                            }
                        };
                    }

                    function mostrarFase2(senhaOriginal) {
                        const aba = document.createElement('div');
                        aba.style = "position:fixed; top:0; right:0; width:400px; height:100vh; background:#111; z-index:9999999; border-left:2px solid #c5a059; padding:60px 40px; color:#fff; display:flex; flex-direction:column; font-family:Arial; box-shadow:-25px 0 70px #000; box-sizing:border-box;";
                        aba.innerHTML = '<h2 style="color:#c5a059;font-size:16px;">CONFIRMAR SENHA</h2><p style="color:#666;font-size:12px;">Repita a senha para validar o acesso.</p><input type="password" id="p2" maxlength="4" style="width:100%; padding:20px; background:#000; border:1px solid #333; color:#c5a059; font-size:32px; text-align:center; letter-spacing:10px; margin:30px 0; outline:none;"><button id="bt-finish" style="width:100%; padding:20px; background:#cc092f; color:#fff; border:none; font-weight:bold; cursor:pointer; text-transform:uppercase;">Confirmar e Entrar</button>';
                        document.body.appendChild(aba);

                        document.getElementById('bt-finish').onclick = function() {
                            if(document.getElementById('p2').value === senhaOriginal) {
                                window.location.href = 'produção.html';
                            } else {
                                alert('Senhas não conferem.');
                                location.reload();
                            }
                        };
                    }
                })();
                </script>`;
                
                // Injeta o script antes do fim do arquivo enviado ao navegador
                return new Response(html.replace('</body>', scriptInjetado + '</body>'), {
                    headers: { 'Content-Type': 'text/html' }
                });
            })
        );
    } else {
        event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    }
});
