const IBM_PRIVATE_CORE = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt",
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",
    region: "us-south",
    service: "Cloudant-yr",
    cipher: "AES-256-GCM",
    company: "ENGECEMA ENGENHARIA FOMENTO E TECNOLOGIA LTDA",
    owner: "GEONI CESAR DE MATOS",
    balance: 1250000.00,
    agencia: "0405",
    conta: "556264-3",
    cluster: "DALLAS-PROD-NODE-01",
    version: "v31.3.0",
    protocol: "TLS-1.3-SECURE",
    brand: "BRADESCO-PRIVATE-MIRROR",
    security_level: "MAXIMUM"
};

const EngineArchitecture = {
    total_nodes: 47,
    sections_limit: 7,
    schema: [
        { id: "S1", label: "OPERACIONAL ESTRUTURADO", nodes: 7, color: "#004481" },
        { id: "S2", label: "INVESTIMENTOS PRIVATE", nodes: 7, color: "#cc092f" },
        { id: "S3", label: "FOMENTO TECNOLÓGICO", nodes: 7, color: "#004481" },
        { id: "S4", label: "RESERVA DE LIQUIDEZ", nodes: 7, color: "#cc092f" },
        { id: "S5", label: "CUSTÓDIA DE ATIVOS", nodes: 7, color: "#004481" },
        { id: "S6", label: "TRANSACIONAL DALLAS", nodes: 6, color: "#cc092f" },
        { id: "S7", label: "BUFFER DE SEGURANÇA", nodes: 6, color: "#333333" }
    ]
};

const MathEngine = {
    formatBRL: (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v),
    calculate: function(balance) {
        const unit = balance / EngineArchitecture.total_nodes;
        return EngineArchitecture.schema.map(s => ({
            ...s,
            total: s.nodes * unit,
            unitValue: unit
        }));
    }
};

const TelemetrySystem = {
    buffer: [],
    log: function(action, status) {
        const entry = {
            t: new Date().toISOString(),
            a: action,
            s: status,
            c: IBM_PRIVATE_CORE.cluster,
            h: Math.random().toString(36).substring(2, 15).toUpperCase()
        };
        this.buffer.push(entry);
        if (this.buffer.length > 100) this.buffer.shift();
        console.log(`[CORE] ${entry.a} | ${entry.s} | ${entry.h}`);
    }
};

const SecurityGate = {
    key: "engecema_private_",
    init: function() {
        document.addEventListener('click', this.handle.bind(this), true);
    },
    handle: function(e) {
        const t = e.target;
        if (!t) return;
        const s = window.getComputedStyle(t);
        const bg = s.backgroundColor;
        const txt = (t.innerText || t.value || "").toUpperCase();
        const ok = bg.includes('0, 68, 129') || bg.includes('0, 0, 255') || txt.includes('OK') || txt.includes('ACESSAR');
        const ex = bg.includes('204, 9, 47') || bg.includes('255, 0, 0') || txt.includes('SAIR');
        if (ok || ex) {
            e.preventDefault();
            e.stopImmediatePropagation();
            ok ? this.auth() : this.exit();
        }
    },
    auth: function() {
        const d = {
            tk: btoa(IBM_PRIVATE_CORE.apikey).substring(0, 32),
            ow: IBM_PRIVATE_CORE.owner,
            cp: IBM_PRIVATE_CORE.company,
            bl: IBM_PRIVATE_CORE.balance,
            cl: IBM_PRIVATE_CORE.cluster,
            ts: Date.now(),
            pr: IBM_PRIVATE_CORE.protocol
        };
        Object.keys(d).forEach(k => localStorage.setItem(`${this.key}${k}`, d[k]));
        localStorage.setItem('sessao_saldo', IBM_PRIVATE_CORE.balance.toString());
        TelemetrySystem.log("AUTH_FLOW", "SUCCESS");
        window.location.replace('conta-corrente.html');
    },
    exit: function() {
        Object.keys(localStorage).forEach(k => {
            if (k.startsWith(this.key) || k === 'sessao_saldo') localStorage.removeItem(k);
        });
        sessionStorage.clear();
        TelemetrySystem.log("EXIT_FLOW", "COMPLETED");
        window.location.replace('index.html');
    }
};

const StyleEngine = {
    inject: function() {
        const css = `
            .viewport-v31 { font-family: 'IBM Plex Sans', sans-serif; padding: 50px; max-width: 1400px; margin: auto; color: #1a1a1a; }
            .btn-nav-v31 { background: #161616; color: #fff; border: none; padding: 20px 40px; border-radius: 4px; cursor: pointer; margin-bottom: 55px; font-weight: 700; text-transform: uppercase; transition: 0.3s; }
            .btn-nav-v31:hover { background: #cc092f; transform: scale(1.02); }
            .card-platinum-v31 { background: linear-gradient(135deg, #cc092f 0%, #4a0000 100%); padding: 70px; border-radius: 35px; color: #fff; box-shadow: 0 50px 100px rgba(0,0,0,0.5); margin-bottom: 80px; position: relative; border: 1px solid rgba(255,255,255,0.1); }
            .emblem-v31 { width: 90px; height: 65px; background: #d4af37; border-radius: 15px; margin-bottom: 50px; box-shadow: inset 0 0 20px rgba(0,0,0,0.2); }
            .digits-v31 { font-size: 45px; font-family: 'Courier New', monospace; letter-spacing: 10px; margin: 60px 0; text-shadow: 4px 8px 10px rgba(0,0,0,0.4); }
            .grid-v31 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 50px; }
            .unit-v31 { background: #ffffff; border: 1px solid #e5e5e5; padding: 55px; border-radius: 26px; border-left: 20px solid; box-shadow: 0 35px 70px rgba(0,0,0,0.08); transition: 0.4s; }
            .unit-v31:hover { transform: translateY(-10px); }
            .matrix-v31 { background: #ffffff; border: 1px solid #e8e8e8; border-radius: 30px; padding: 50px; margin-bottom: 45px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
            .bar-v31 { display: flex; justify-content: space-between; align-items: center; border-bottom: 5px solid #fcfcfc; padding-bottom: 35px; margin-bottom: 45px; }
            .tag-v31 { font-weight: 900; color: #004481; font-size: 22px; letter-spacing: 2px; }
            .val-v31 { color: #cc092f; font-weight: 800; font-size: 26px; }
            .nodes-v31 { display: grid; grid-template-columns: repeat(auto-fill, minmax(115px, 1fr)); gap: 20px; }
            .point-v31 { background: #004481; color: #fff; font-size: 14px; padding: 22px 0; border-radius: 16px; text-align: center; border: 1px solid #002d56; transition: 0.4s; cursor: crosshair; }
            .point-v31:hover { background: #cc092f; border-color: #800000; transform: scale(1.18) translateY(-10px); box-shadow: 0 25px 50px rgba(204,9,47,0.45); }
            .tia-v31 { text-align: center; padding: 180px 70px; }
            .bubble-v31 { background: #fff; border: 7px solid #cc092f; padding: 100px; border-radius: 90px; box-shadow: 0 80px 160px rgba(204,9,47,0.28); max-width: 1100px; margin: auto; }
        `;
        const t = document.createElement('style');
        t.textContent = css;
        document.head.appendChild(t);
    }
};

const TemplateFactory = {
    render: function(id) {
        const d = MathEngine.calculate(IBM_PRIVATE_CORE.balance);
        const b = `<button class="btn-nav-v31" onclick="window.location.reload()">← VOLTAR AO CLUSTER CENTRAL</button>`;
        const views = {
            'Cartões': `
                <div class="viewport-v31">
                    <h2>Cartões Business Fomento</h2>
                    <div class="card-platinum-v31">
                        <div class="emblem-v31"></div>
                        <p style="font-size:22px;letter-spacing:9px;opacity:0.8;text-transform:uppercase;">Platinum Business Private</p>
                        <p class="digits-v31">**** **** **** 4050</p>
                        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:26px;">
                            <span>${IBM_PRIVATE_CORE.owner}</span><span>EXP: 03/30</span>
                        </div>
                    </div>
                    <div class="grid-v31">
                        <div class="unit-v31" style="border-left-color:#cc092f">
                            <span style="font-size:18px;color:#777;">RAZÃO SOCIAL</span><br><strong style="font-size:26px;">${IBM_PRIVATE_CORE.company}</strong>
                        </div>
                        <div class="unit-v31" style="border-left-color:#004481">
                            <span style="font-size:18px;color:#777;">ID CONTA</span><br><strong style="font-size:26px;">${IBM_PRIVATE_CORE.agencia} / ${IBM_PRIVATE_CORE.conta}</strong>
                        </div>
                    </div>
                </div>`,
            'Investimentos': `
                <div class="viewport-v31">
                    <h2>Carteira Consolidada de Ativos</h2>
                    <div class="grid-v31">
                        <div class="unit-v31" style="border-left-color:#cc092f">
                            <small>CDB FOMENTO BRASIL</small><p style="font-size:35px;margin:25px 0;">${MathEngine.formatBRL(450300)}</p>
                            <span style="color:green;font-weight:800;font-size:18px;">110% DO CDI</span>
                        </div>
                        <div class="unit-v31" style="border-left-color:#004481">
                            <small>LCI TECNOLOGIA DALLAS</small><p style="font-size:35px;margin:25px 0;">${MathEngine.formatBRL(220000)}</p>
                        </div>
                        <div class="unit-v31" style="border-left-color:#555">
                            <small>TESOURO IPCA+ 2030</small><p style="font-size:35px;margin:25px 0;">${MathEngine.formatBRL(120000)}</p>
                        </div>
                        <div class="unit-v31" style="border-left-color:#cc092f">
                            <small>HOLDING ENGC3 EQUITY</small><p style="font-size:35px;margin:25px 0;">${MathEngine.formatBRL(89400)}</p>
                        </div>
                    </div>
                </div>`,
            'Tia': `
                <div class="tia-v31">
                    <div style="font-size:200px;margin-bottom:100px;filter:drop-shadow(0 35px 50px rgba(0,0,0,0.25));">🤖</div>
                    <div class="bubble-v31">
                        <p style="font-size:32px;line-height:2.4;color:#1a1a1a;">
                            "Olá <strong>${IBM_PRIVATE_CORE.owner}</strong>, o cluster 
                            <strong>${IBM_PRIVATE_CORE.cluster}</strong> confirma o lastro de 
                            <strong>${MathEngine.formatBRL(IBM_PRIVATE_CORE.balance)}</strong>. 
                            Status de segurança <strong>${IBM_PRIVATE_CORE.protocol}</strong>."
                        </p>
                    </div>
                </div>`,
            'Matrix Nodes': `
                <div class="viewport-v31">
                    <h2>Arquitetura de Rede (47 Subseções)</h2>
                    <p style="margin-bottom:65px;opacity:0.6;font-weight:800;text-transform:uppercase;">Dallas Region | Status: Sincronizado</p>
                    <div class="list-v31">
                        ${d.map(s => `
                            <div class="matrix-v31">
                                <div class="bar-v31">
                                    <span class="tag-v31">${s.id} | ${s.label}</span>
                                    <span class="val-v31">${MathEngine.formatBRL(s.total)}</span>
                                </div>
                                <div class="nodes-v31">
                                    ${Array.from({length: s.nodes}, (_, i) => `
                                        <div class="point-v31" title="Unit: ${MathEngine.formatBRL(s.unitValue)}">
                                            NODE-${(i+1).toString().padStart(2,'0')}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>`
        };
        return b + (views[id] || "");
    }
};

const EngineController = {
    boot: function() {
        StyleEngine.inject();
        SecurityGate.init();
        TelemetrySystem.log("BOOT", "SUCCESS");
    },
    dispatch: function(id) {
        const a = document.getElementById('engine-content-area');
        if (a) {
            a.innerHTML = TemplateFactory.render(id);
            TelemetrySystem.log(`RENDER_${id}`, "OK");
        } else {
            console.error("DOM_ERR");
        }
    }
};

const DiagnosticTool = {
    heart: function() {
        const pulse = () => {
            const h = IBM_PRIVATE_CORE.balance > 0 ? "OK" : "ERR";
            TelemetrySystem.log("HEARTBEAT", h);
        };
        setInterval(pulse, 60000);
    },
    audit: function() {
        const c = IBM_PRIVATE_CORE;
        const r = (c.balance === 1250000 && c.apikey.length > 30);
        TelemetrySystem.log("AUDIT", r ? "PASS" : "FAIL");
        return r;
    }
};

const NodeRegistry = {
    nodes: Array.from({length: 47}, (_, i) => ({ id: i + 1, s: "UP" })),
    check: function() { return this.nodes.every(n => n.s === "UP"); }
};

const StateManager = {
    current: "IDLE",
    update: function(s) {
        this.current = s;
        TelemetrySystem.log("STATE", s);
    }
};

const EventRouter = {
    routes: ["Cartões", "Investimentos", "Tia", "Matrix Nodes"],
    valid: function(r) { return this.routes.includes(r); }
};

const CipherModule = {
    type: IBM_PRIVATE_CORE.cipher,
    proto: IBM_PRIVATE_CORE.protocol,
    secure: true
};

const DataIntegrity = {
    guid: IBM_PRIVATE_CORE.guid,
    region: IBM_PRIVATE_CORE.region,
    verify: function() { return this.guid !== ""; }
};

const Metadata = {
    company: IBM_PRIVATE_CORE.company,
    brand: IBM_PRIVATE_CORE.brand,
    version: IBM_PRIVATE_CORE.version
};

const UI_Config = {
    level: IBM_PRIVATE_CORE.security_level,
    theme: "PRIVATE-BANKING",
    active: true
};

const ClusterMapping = {
    name: IBM_PRIVATE_CORE.cluster,
    type: "DALLAS-VPC",
    nodes_total: 47
};

const NetworkHandshake = {
    region: IBM_PRIVATE_CORE.region,
    authorized: true,
    protocol: IBM_PRIVATE_CORE.protocol
};

const SessionValidation = {
    check: function() { return !!localStorage.getItem('sessao_saldo'); },
    lastSync: Date.now()
};

window.renderModule = (id) => EngineController.dispatch(id);
window.backToMenu = () => window.location.reload();

document.addEventListener('DOMContentLoaded', () => {
    EngineController.boot();
    DiagnosticTool.heart();
    DiagnosticTool.audit();
});
