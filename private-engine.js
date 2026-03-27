/**
 * MOTOR DALLAS v6.7.0 - FLUXO DE CALENDÁRIO (GEONI C. MATOS)
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

    // --- LÓGICA DE TELAS ---

    if (titulo === 'Agendamentos' || titulo === 'Buscador de Boletos') {
        conteudo.innerHTML = `
            <h2 style="color:#004481;">${titulo}</h2>
            <div style="background:#fff; border:1px solid #ddd; padding:20px; border-radius:8px; text-align:left;">
                <p style="font-size:13px; font-weight:bold;">CONSULTA DE LANÇAMENTOS</p>
                <hr>
                <div style="padding:15px; text-align:center; color:#666;">
                    <i style="font-size:30px; display:block;">📅</i>
                    <p>Não existem agendamentos para Geoni Cesar de Matos hoje.</p>
                </div>
                <button onclick="abrirTelaAgendar()" style="width:100%; padding:15px; background:var(--br-red); color:#fff; border:none; border-radius:4px; font-weight:bold; cursor:pointer; font-size:14px;">AGENDAR NOVO PAGAMENTO</button>
            </div>
        `;
    } 
    else if (titulo === 'Pix' || titulo === 'Transferência' || titulo === 'Pagamentos') {
        conteudo.innerHTML = `
            <h2 style="color:#cc092f;">${titulo}</h2>
            <p>Saldo: <strong>${saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
            <input type="text" id="op-chave" placeholder="Chave ou Código de Barras" style="width:100%; padding:15px; margin:10px 0; border:1px solid #ddd; border-radius:4px;">
            <input type="number" id="op-valor" placeholder="Valor R$" style="width:100%; padding:15px; border:1px solid #ddd; border-radius:4px;">
            <button onclick="processarOperacao('${titulo}')" style="background:#cc092f; color:#fff; width:100%; border:none; padding:15px; font-weight:bold; cursor:pointer;">EFETUAR AGORA</button>
        `;
    }
    // ... (mantive Cartões, Tia e Fallback conforme versões anteriores)
    else {
        conteudo.innerHTML = `<h2 style="color:#cc092f;">${titulo}</h2><div style="text-align:center; padding:40px;"><i style="font-size:40px; color:#999; display:block;">📋</i><p>Módulo ${titulo} sincronizado.</p><button onclick="voltarHome()">VOLTAR</button></div>`;
    }
}

// --- NOVA FUNÇÃO: TELA DE ESCOLHA DE DATA (CESTA DE AGENDAMENTO) ---
function abrirTelaAgendar() {
    const conteudo = document.getElementById('conteudo-dinamico');
    conteudo.innerHTML = `
        <h2 style="color:#cc092f;">Novo Agendamento</h2>
        <div style="background:#fff; padding:20px; border-radius:8px; border:1px solid #eee; text-align:left;">
            <label style="font-size:12px; font-weight:bold;">TIPO DE CONTA / BOLETO</label>
            <input type="text" placeholder="Ex: Luz, Telefone, Condomínio" style="width:100%; padding:12px; margin:10px 0; border:1px solid #ddd;">
            
            <label style="font-size:12px; font-weight:bold;">DATA PARA DÉBITO</label>
            <input type="date" id="data-agenda" style="width:100%; padding:12px; margin:10px 0; border:1px solid #ddd; font-family:sans-serif;">
            
            <label style="font-size:12px; font-weight:bold;">VALOR R$</label>
            <input type="number" id="op-valor" placeholder="0,00" style="width:100%; padding:12px; margin:10px 0; border:1px solid #ddd;">
            
            <button onclick="confirmarAgendamento()" style="width:100%; padding:15px; background:#004481; color:#fff; border:none; border-radius:4px; font-weight:bold; margin-top:10px; cursor:pointer;">CONFIRMAR AGENDAMENTO</button>
        </div>
    `;
}

function confirmarAgendamento() {
    const data = document.getElementById('data-agenda').value;
    if(!data) return alert("Por favor, selecione uma data válida.");
    
    alert("Agendamento realizado com sucesso para o dia " + data.split('-').reverse().join('/'));
    voltarHome();
}

function voltarHome() { document.getElementById('tela-home').style.display = 'block'; document.getElementById('tela-servico').style.display = 'none'; atualizarDisplaySaldo(); }
function processarOperacao(tipo) {
    const valor = parseFloat(document.getElementById('op-valor').value);
    if (!valor || valor <= 0 || valor > saldoAtual) return alert("Erro no valor.");
    saldoAtual -= valor;
    localStorage.setItem('sessao_saldo', saldoAtual.toFixed(2));
    alert(`${tipo} realizado com sucesso!`);
    voltarHome();
}
function executarSair() { localStorage.clear(); window.location.href = 'index.html'; }
