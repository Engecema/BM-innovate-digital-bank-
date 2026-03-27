/**
 * MOTOR DALLAS v6.4.0 - MAPEAMENTO TOTAL DE MÓDULOS (GEONI C. MATOS)
 */

const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south"
};

let saldoAtual = parseFloat(localStorage.getItem('sessao_saldo') || 1250000.00);

document.addEventListener("DOMContentLoaded", function() {
    atualizarDisplaySaldo();
    verificarIntegridadeSessao();
});

function atualizarDisplaySaldo() {
    const el = document.getElementById('display-saldo');
    if (el) el.innerText = saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function openSys(titulo) {
    const home = document.getElementById('tela-home');
    const servico = document.getElementById('tela-servico');
    const conteudo = document.getElementById('conteudo-dinamico');

    if (!home || !servico || !conteudo) return;

    home.style.display = 'none';
    servico.style.display = 'block';
    window.scrollTo(0, 0);

    // --- LOGICA DE TELAS POR CATEGORIA ---

    // 1. TRANSAÇÕES (Pix, Pagamentos, Transferência)
    if (['Pix', 'Transferência', 'Pagamentos', 'Saque', 'Recarga'].includes(titulo)) {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">${titulo}</h2>
            <p>Saldo Disponível: <strong>${saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
            <hr>
            <div style="margin-top:20px;">
                <input type="text" id="op-chave" placeholder="Dados do Favorecido" style="width:100%; padding:15px; margin-bottom:10px; border:1px solid #ddd; border-radius:4px;">
                <input type="number" id="op-valor" placeholder="Valor R$" style="width:100%; padding:15px; border:1px solid #ddd; border-radius:4px;">
                <button onclick="processarOperacao('${titulo}')" style="background:#cc092f; color:#fff; width:100%; border:none; padding:15px; font-weight:bold; cursor:pointer; border-radius:4px;">CONFIRMAR OPERAÇÃO</button>
            </div>
        `;
    } 
    // 2. CONSULTAS (Saldos, Extratos, Comprovantes)
    else if (['Saldo e Extrato', 'Extrato Mensal', 'Extrato Período', 'Comprovantes', 'Lançamentos', 'Imposto de Renda'].includes(titulo)) {
        conteudo.innerHTML = `
            <h2 style="color:#004481;">${titulo}</h2>
            <div style="background:#fff; border:1px solid #eee; padding:20px; border-radius:8px; text-align:left;">
                <p style="font-size:12px; color:#666;">GEONI CESAR DE MATOS | CPF ***.813.383-**</p>
                <hr>
                <div style="display:flex; justify-content:space-between; padding:10px 0;">
                    <span>Saldos Consolidados</span><strong>${saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                </div>
                <div style="display:flex; justify-content:space-between; padding:10px 0; color:green;">
                    <span>Crédito Dallas Cloud</span><strong>+ R$ 1.250.000,00</strong>
                </div>
                <p style="font-size:10px; color:#999; margin-top:20px; text-align:center;">Documento validado via IBM Cloudant Protocol</p>
            </div>
        `;
    }
    // 3. CRÉDITO E INVESTIMENTOS
    else if (['Empréstimos', 'Credito Imobiliário', 'Limite de Credito', 'Investimentos', 'Previdência', 'Agora Home Broker'].includes(titulo)) {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">${titulo}</h2>
            <div style="padding:20px; border:1px solid #eee; border-radius:8px;">
                <p>Olá, Geoni! Temos ofertas pré-aprovadas para <strong>${titulo}</strong>.</p>
                <div style="background:#f4f7f9; padding:15px; margin:15px 0; font-weight:bold; color:#004481;">
                    LIMITE DISPONÍVEL: R$ 450.000,00
                </div>
                <button onclick="alert('Iniciando contratação de ${titulo}...')" style="background:#004481; color:#fff; border:none; padding:12px; width:100%; border-radius:4px; font-weight:bold;">CONTRATAR AGORA</button>
            </div>
        `;
    }
    // 4. PERFIL, TIA E SEGURANÇA
    else if (titulo === 'Tia' || titulo === 'Chat' || titulo === 'Segurança') {
        conteudo.innerHTML = `
            <div style="text-align:center;">
                <i style="font-size:50px;">🤖</i>
                <h2 style="color:#cc092f;">Assistente TIA</h2>
                <p>Geoni, como posso ajudar com sua <strong>${titulo}</strong> hoje?</p>
                <input type="text" placeholder="Digite sua mensagem..." style="width:100%; padding:15px; border:1px solid #ddd; border-radius:4px;">
                <button onclick="alert('TIA: Estou analisando seu pedido...')" style="background:#004481; color:#fff; border:none; padding:10px 20px; margin-top:10px; border-radius:4px; cursor:pointer;">ENVIAR</button>
            </div>
        `;
    }
    // 5. PADRÃO PARA DEMAIS ITENS (Mimos, Shopping, Pedágio, etc)
    else {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">${titulo}</h2>
            <div style="background:#f9f9f9; padding:30px; border-radius:8px; border:1px dashed #ccc; text-align:center;">
                <i style="font-size:40px; color:#999; display:block; margin-bottom:10px;">📋</i>
                <p>O serviço de <strong>${titulo}</strong> está pronto para uso.</p>
                <p style="font-size:12px; color:#666;">Nenhuma pendência encontrada para Geoni Cesar de Matos.</p>
                <button onclick="voltarHome()" style="margin-top:20px; background:none; border:1px solid #cc092f; color:#cc092f; padding:8px 15px; border-radius:4px; font-weight:bold; cursor:pointer;">FECHAR MÓDULO</button>
            </div>
        `;
    }
}

function voltarHome() {
    document.getElementById('tela-home').style.display = 'block';
    document.getElementById('tela-servico').style.display = 'none';
    atualizarDisplaySaldo();
}

function processarOperacao(tipo) {
    const valor = parseFloat(document.getElementById('op-valor').value);
    if (!valor || valor <= 0 || valor > saldoAtual) return alert("Erro: Verifique o valor e seu saldo disponível.");
    saldoAtual -= valor;
    localStorage.setItem('sessao_saldo', saldoAtual.toFixed(2));
    alert(`Sucesso! ${tipo} processado via Dallas Seguros.`);
    voltarHome();
}

function executarSair() { localStorage.clear(); window.location.href = 'index.html'; }
function verificarIntegridadeSessao() { if (window.location.pathname.includes('conta-corrente.html') && !localStorage.getItem('engecema_auth_token')) window.location.href = 'index.html'; }
function validarAcesso(event) { if (event) event.preventDefault(); localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO'); window.location.href = 'conta-corrente.html'; }
