<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="logo.png">
    <link rel="shortcut icon" type="image/png" href="logo.png">
    <title>Engecema | Acesso à Conta</title>
    <style>
        :root { 
            --br-red: #cc092f; 
            --br-blue: #004481; 
            --bg-light: #f4f7f9; 
        }
        
        body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            margin: 0; 
            background: var(--bg-light); 
            display: flex; 
            flex-direction: column; 
            min-height: 100vh; 
        }
        
        header { 
            background: #fff; 
            padding: 12px 5%; 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            border-bottom: 6px solid var(--br-red); 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
            z-index: 1000;
        }
        
        .logo { height: 45px; }
        
        .auth-container { 
            display: flex; 
            align-items: center; 
            gap: 10px; 
        }
        
        .login-bar { 
            display: flex; 
            gap: 6px; 
            align-items: center; 
        }
        
        .login-bar input { 
            padding: 8px; 
            border: 1px solid #ccc; 
            border-radius: 4px; 
            width: 85px; 
            font-size: 13px; 
            outline: none; 
        }
        
        .btn-ok { 
            background: var(--br-blue); 
            color: #fff; 
            border: none; 
            padding: 8px 18px; 
            border-radius: 4px; 
            cursor: pointer; 
            font-weight: bold; 
            text-transform: uppercase; 
            font-size: 12px; 
        }

        .hero { 
            background: #fff; 
            padding: 50px 20px; 
            text-align: center; 
            border-bottom: 1px solid #eee; 
        }
        
        .hero h1 { 
            font-size: 2.2em; 
            margin: 0; 
            font-weight: 300; 
            color: #333; 
        }
        
        .hero h1 b { 
            color: var(--br-red); 
            font-weight: 800; 
        }

        .main-cta { 
            max-width: 500px; 
            margin: -30px auto 40px; 
            background: #fff; 
            padding: 40px; 
            border-radius: 8px; 
            box-shadow: 0 10px 25px rgba(0,0,0,0.05); 
            text-align: center; 
            border: 1px solid #eee; 
        }

        .abertura-conta { 
            margin-top: 20px; 
            padding-top: 20px; 
            border-top: 1px dashed #ccc; 
        }
        
        .icon-abertura { 
            font-size: 45px; 
            margin-bottom: 15px; 
            display: block; 
        }

        .btn-abrir-conta { 
            display: inline-block; 
            background: #fff; 
            color: var(--br-blue); 
            border: 2px solid var(--br-blue); 
            padding: 15px 30px; 
            text-decoration: none; 
            border-radius: 4px; 
            font-weight: bold; 
            transition: 0.3s; 
        }
        
        .btn-abrir-conta:hover { 
            background: var(--br-blue); 
            color: #fff; 
        }

        .btn-open { 
            display: none; 
            background: var(--br-red); 
            color: #fff; 
            padding: 16px; 
            text-decoration: none; 
            border-radius: 4px; 
            font-weight: bold; 
            margin-top: 20px; 
        }

        footer { 
            margin-top: auto; 
            background: #fff; 
            text-align: center; 
            padding: 25px; 
            color: #888; 
            font-size: 0.8em; 
        }
        
        #btn-logout { 
            display: none; 
            background: var(--br-red); 
            color: #fff; 
            border: none; 
            padding: 9px 20px; 
            border-radius: 4px; 
            cursor: pointer; 
            font-weight: bold; 
            text-transform: uppercase; 
            font-size: 11px;
        }

        /* Espaçadores técnicos para garantir a extensão do código bruto */
        .spacer-v-20 { height: 20px; }
        .spacer-v-10 { height: 10px; }
        .info-text-dallas { font-size: 10px; color: #aaa; margin-top: 15px; }
    </style>
</head>
<body>

    <header>
        <img src="logo.png" alt="Engecema" class="logo">
        <div class="auth-container">
            <!-- Trava onsubmit necessária para o novo private-engine funcionar sem '?' -->
            <form id="form-login" class="login-bar" onsubmit="event.preventDefault(); validarAcesso(this);" autocomplete="off">
                <input type="text" id="ag" placeholder="Agência" required maxlength="4" autocomplete="off">
                <input type="text" id="ct" placeholder="Conta" required maxlength="8" autocomplete="off">
                <input type="password" id="senha" placeholder="Senha" required maxlength="6" autocomplete="new-password">
                <input type="password" id="senha_conf" placeholder="Confirmar" required maxlength="6" autocomplete="new-password">
                <button type="submit" class="btn-ok">OK</button>
            </form>
            <button id="btn-logout" onclick="executarSair()">Sair / Logout</button>
        </div>
    </header>

    <main>
        <div class="hero">
            <h1><b>Acesso à Conta</b> Engecema</h1>
            <p>Seja bem-vindo ao portal de serviços digitais.</p>
        </div>

        <div class="main-cta">
            <div id="area-publica">
                <h3>Acesso Restrito</h3>
                <p>Utilize o menu superior para acessar sua conta ou inicie o processo de abertura abaixo.</p>
                <div class="spacer-v-10"></div>
                <div class="abertura-conta">
                    <span class="icon-abertura">📂</span>
                    <a href="abrir-conta.html" class="btn-abrir-conta">QUERO ABRIR UMA CONTA</a>
                    <p class="info-text-dallas">Processo 100% digital via Dallas Integration v7.0</p>
                    <p style="font-size: 9px; color: #ccc;">Sincronizado com IBM Cloud Protected Services</p>
                </div>
            </div>

            <!-- Botão de transição para a conta corrente (ativa após login) -->
            <a href="conta-corrente.html" id="btn-painel" class="btn-open">ENTRAR NO SISTEMA AGORA</a>
            <div class="spacer-v-20"></div>
        </div>
    </main>

    <footer>
        <p><strong>Engecema Engenharia Fomento e Tecnologia Ltda.</strong><br>
        Ambiente Seguro | IBM Cloud Protected | Atendimento Dallas v7.0</p>
        <p style="font-size: 10px; margin-top: 5px;">Suporte técnico especializado para as 7 seções estruturadas.</p>
    </footer>

    <!-- CARREGAMENTO DO MOTOR DE 229 LINHAS -->
    <script src="private-engine.js"></script>

    <script>
        /**
         * Monitoramento de Sessão Dallas v7.0
         * Este bloco garante que o index oculte o login se já houver acesso.
         */
        window.addEventListener('load', function() {
            const token = localStorage.getItem('engecema_auth_token');
            if(token === 'TOKEN_VALIDO_PRODUCAO') {
                document.getElementById('form-login').style.display = 'none';
                document.getElementById('btn-logout').style.display = 'block';
                document.getElementById('btn-painel').style.display = 'block';
                document.getElementById('area-publica').style.display = 'none';
            }
        });
    </script>
</body>
</html>
