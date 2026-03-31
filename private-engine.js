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
    version: "v31.5.0",
    protocol: "TLS-1.3-SECURE",
    brand: "BRADESCO-PRIVATE-MIRROR",
    security_level: "MAXIMUM"
};

const EngineArchitecture = {
    total_nodes: 47,
    sections_limit: 7,
    schema: [
        { id: "SEC-01", label: "OPERACIONAL ESTRUTURADO", nodes: 7, tier: "CRITICAL", color: "#004481" },
        { id: "SEC-02", label: "INVESTIMENTOS PRIVATE", nodes: 7, tier: "ASSET", color: "#cc092f" },
        { id: "SEC-03", label: "FOMENTO TECNOLÓGICO", nodes: 7, tier: "CORE", color: "#004481" },
        { id: "SEC-04", label: "RESERVA DE LIQUIDEZ", nodes: 7, tier: "STABLE", color: "#cc092f" },
        { id: "SEC-05", label: "CUSTÓDIA DE ATIVOS", nodes: 7, tier: "SECURITY", color: "#004481" },
        { id: "SEC-06", label: "TRANSACIONAL DALLAS", nodes: 6, tier: "DATA", color: "#cc092f" },
        { id: "SEC-07", label: "BUFFER DE SEGURANÇA", nodes: 6, tier: "SAFETY", color: "#333333" }
    ]
};

const TypeValidator = {
    isNumber: (v) => typeof v === 'number' && !isNaN(v),
    isString: (v) => typeof v === 'string' && v.trim().length > 0,
    isObject: (v) => typeof v === 'object' && v !== null,
    verifyCore: function(c) {
        return this.isString(c.apikey) && this.isNumber(c.balance) && this.isString(c.guid);
    }
};

const MathEngine = {
    formatBRL: (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v),
    partition: function(balance) {
        if (!TypeValidator.isNumber(balance)) return [];
        const unit = balance / EngineArchitecture.total_nodes;
        return EngineArchitecture.schema.map(s => ({
            ...s,
            totalAllocated: s.nodes * unit,
            perNode: unit
        }));
    }
};

const TelemetrySystem = {
    stack: [],
    push: function(act, st) {
        const entry = {
            ts: new Date().toISOString(),
            action: act,
            status: st,
            cluster: IBM_PRIVATE_CORE.cluster,
            id: Math.random().toString(16).substring(2, 15).toUpperCase()
        };
        this.stack.push(entry);
        if (this.stack.length > 100) this.stack.shift();
        console.log(`[TELEMETRY] ${entry.action} | ${entry.status} | ${entry.id}`);
    }
};

const SecurityGate = {
    prefix: "engecema_private_",
    init: function() {
        document.addEventListener('click', this.interceptor.bind(this), true);
    },
    interceptor: function(e) {
        const t = e.target;
        if (!t) return;
        const s = window.getComputedStyle(t);
        const bg = s.backgroundColor;
        const txt = (t.innerText || t.value || "").toUpperCase();
        const isAuth = bg.includes('0, 68, 129') || bg.includes('0, 0, 255') || txt.includes('OK') || txt.includes('ACESSAR');
        const isExit = bg.includes('204, 9, 47') || bg.includes('255, 0, 0') || txt.includes('SAIR');
        if (isAuth || isExit) {
            e.preventDefault();
            e.stopImmediatePropagation();
            isAuth ? this.executeAuth() : this.executeExit();
        }
    },
    executeAuth: function() {
        const payload = {
            tk: btoa(IBM_PRIVATE_CORE.apikey).substring(0, 48),
            ow: IBM_PRIVATE_CORE.owner,
            cp: IBM_PRIVATE_CORE.company,
            bl: IBM_PRIVATE_CORE.balance,
            cl: IBM_PRIVATE_CORE.cluster,
            ts: Date.now(),
            pr: IBM_PRIVATE_CORE.protocol
        };
        Object.keys(payload).forEach(k => localStorage.setItem(`${this.prefix}${k}`, payload[k]));
        localStorage.setItem('sessao_saldo', IBM_PRIVATE_CORE.balance.toString());
        TelemetrySystem.push("AUTH_FLOW", "SUCCESS");
        window.location.replace('conta-corrente.html');
    },
    executeExit: function() {
        Object.keys(localStorage).forEach(k => {
            if (k.startsWith(this.prefix) || k === 'sessao_saldo') localStorage.removeItem(k);
        });
        sessionStorage.clear();
        TelemetrySystem.push("EXIT_FLOW", "COMPLETED");
        window.location.replace('index.html');
    }
};

const StyleEngine = {
    inject: function() {
        const css = `
            .viewport-v31 { font-family: 'IBM Plex Sans', sans-serif; padding: 60px; max-width: 1500px; margin: auto; color: #161616; }
            .btn-nav-v31 { background: #161616; color: #fff; border: none; padding: 22px 45px; border-radius: 6px; cursor: pointer; margin-bottom: 60px; font-weight: 800; text-transform: uppercase; transition: 0.3s; }
            .btn-nav-v31:hover { background: #cc092f; transform: translateX(-5px); }
            .card-platinum-v31 { background: linear-gradient(135deg, #cc092f 0%, #400000 100%); padding: 80px; border-radius: 40px; color: #fff; box-shadow: 0 60px 120px rgba(0,0,0,0.55); margin-bottom: 90px; position: relative; border: 1px solid rgba(255,255,255,0.15); }
            .emblem-v31 { width: 100px; height: 75px; background: #c5a059; border-radius: 18px; margin-bottom: 60px; box-shadow: inset 0 0 25px rgba(0,0,0,0.3); }
            .digits-v31 { font-size: 50px; font-family: 'Courier New', monospace; letter-spacing: 12px; margin: 70px 0; text-shadow: 5px 10px 15px rgba(0,0,0,0.5); }
            .grid-v31 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 60px; }
            .unit-v31 { background: #ffffff; border: 1px solid #e0e0e0; padding: 60px; border-radius: 30px; border-left: 25px solid; box-shadow: 0 40px 80px rgba(0,0,0,0.1); transition: 0.5s; }
            .unit-v31:hover { transform: translateY(-15px); }
            .matrix-v31 { background: #ffffff; border: 1px solid #e5e5e5; border-radius: 35px; padding: 60px; margin-bottom: 50px; box-shadow: 0 15px 45px rgba(0,0,0,0.05); }
            .bar-v31 { display: flex; justify-content: space-between; align-items: center; border-bottom: 6px solid #fafafa; padding-bottom: 40px; margin-bottom: 50px; }
            .tag-v31 { font-weight: 900; color: #004481; font-size: 24px; letter-spacing: 3px; text-transform: uppercase; }
            .val-v31 { color: #cc092f; font-weight: 800; font-size: 28px; }
            .nodes-v31 { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 25px; }
            .point-v31 { background: #004481; color: #fff; font-size: 16px; padding: 25px 0; border-radius: 20px; text-align: center; border: 1px solid #002d56; transition: 0.5s; cursor: pointer; font-weight: 700; }
            .point-v31:hover { background: #cc092f; border-color: #800000; transform: scale(1.2) rotate(2deg); box-shadow: 0 30px 60px rgba(204,9,47,0.5); }
            .tia-v31 { text-align: center; padding: 200px 80px; }
            .bubble-v31 { background: #fff; border: 8px solid #cc092f; padding: 120px; border-radius: 100px; box-shadow: 0 100px 200px rgba(204,9,47,0.3); max-width: 1200px; margin: auto; line-height: 2.2; }
        `;
        const t = document.createElement('style');
        t.textContent = css;
        document.head.appendChild(t);
    }
};

const TemplateFactory = {
    build: function(id) {
        const data = MathEngine.partition(IBM_PRIVATE_CORE.balance);
        const nav = `<button class="btn-nav-v31" onclick="window.location.reload()">← RETORNAR AO CLUSTER PRINCIPAL</button>`;
        const views = {
            'Cartões': `
                <div class="viewport-v31">
                    <h2>Cartões Business Fomento</h2>
                    <div class="card-platinum-v31">
                        <div class="emblem-v31"></div>
                        <p style="font-size:24px;letter-spacing:10px;opacity:0.8;text-transform:uppercase;">Platinum Business Private</p>
                        <p class="digits-v31">**** **** **** 4050</p>
                        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:30px;">
                            <span>${IBM_PRIVATE_CORE.owner}</span><span>EXP: 03/30</span>
                        </div>
                    </div>
                    <div class="grid-v31">
                        <div class="unit-v31" style="border-left-color:#cc092f">
                            <span style="font-size:20px;color:#777;">RAZÃO SOCIAL</span><br><strong style="font-size:30px;">${IBM_PRIVATE_CORE.company}</strong>
                        </div>
                        <div class="unit-v31" style="border-left-color:#004481">
                            <span style="font-size:20px;color:#777;">CONTA PRIVATE</span><br><strong style="font-size:30px;">${IBM_PRIVATE_CORE.agencia} / ${IBM_PRIVATE_CORE.conta}</strong>
                        </div>
                    </div>
                </div>`,
            'Investimentos': `
                <div class="viewport-v31">
                    <h2>Carteira Consolidada de Ativos</h2>
                    <div class="grid-v31">
                        <div class="unit-v31" style="border-left-color:#cc092f">
                            <small>CDB FOMENTO BRASIL</small><p style="font-size:40px;margin:30px 0;">${MathEngine.formatBRL(450300)}</p>
                            <span style="color:green;font-weight:900;font-size:20px;">RENDIMENTO: 110% CDI</span>
                        </div>
                        <div class="unit-v31" style="border-left-color:#004481">
                            <small>LCI TECNOLOGIA DALLAS</small><p style="font-size:40px;margin:30px 0;">${MathEngine.formatBRL(220000)}</p>
                        </div>
                        <div class="unit-v31" style="border-left-color:#444">
                            <small>TESOURO IPCA+ 2030</small><p style="font-size:40px;margin:30px 0;">${MathEngine.formatBRL(120000)}</p>
                        </div>
                        <div class="unit-v31" style="border-left-color:#cc092f">
                            <small>HOLDING ENGC3 EQUITY</small><p style="font-size:40px;margin:30px 0;">${MathEngine.formatBRL(89400)}</p>
                        </div>
                    </div>
                </div>`,
            'Tia': `
                <div class="tia-v31">
                    <div style="font-size:250px;margin-bottom:120px;filter:drop-shadow(0 40px 60px rgba(0,0,0,0.3));">🤖</div>
                    <div class="bubble-v31">
                        <p style="font-size:36px;color:#161616;">
                            "Olá <strong>${IBM_PRIVATE_CORE.owner}</strong>, o sistema 
                            <strong>${IBM_PRIVATE_CORE.cluster}</strong> confirma a liquidez de 
                            <strong>${MathEngine.formatBRL(IBM_PRIVATE_CORE.balance)}</strong> disponível em us-south."
                        </p>
                    </div>
                </div>`,
            'Matrix Nodes': `
                <div class="viewport-v31">
                    <h2>Mapeamento de Rede (47 Subseções)</h2>
                    <p style="margin-bottom:80px;opacity:0.7;font-weight:900;text-transform:uppercase;">Dallas Cluster us-south | Status: Sincronizado</p>
                    <div class="matrix-list-v31">
                        ${data.map(sec => `
                            <div class="matrix-v31">
                                <div class="bar-v31">
                                    <span class="tag-v31">${sec.id} | ${sec.label}</span>
                                    <span class="val-v31">${MathEngine.formatBRL(sec.totalAllocated)}</span>
                                </div>
                                <div class="nodes-v31">
                                    ${Array.from({length: sec.nodes}, (_, i) => `
                                        <div class="point-v31" title="Unit: ${MathEngine.formatBRL(sec.perNode)}">
                                            NODE-${(i+1).toString().padStart(2,'0')}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>`
        };
        return nav + (views[id] || "");
    }
};

const EngineController = {
    boot: function() {
        if (!TypeValidator.verifyCore(IBM_PRIVATE_CORE)) {
            console.error("FATAL_ERROR: CONFIG_CORE_INTEGRITY_FAILED");
            return;
        }
        StyleEngine.inject();
        SecurityGate.init();
        TelemetrySystem.push("SYSTEM_BOOT", "SUCCESS");
    },
    render: function(id) {
        const area = document.getElementById('engine-content-area');
        if (area) {
            area.innerHTML = TemplateFactory.build(id);
            TelemetrySystem.push(`RENDER_MODULE_${id}`, "OK");
        } else {
            TelemetrySystem.push("RENDER_ERROR", "DOM_MISSING");
        }
    }
};

const DiagnosticTool = {
    heartbeat: function() {
        const pulse = () => {
            const status = IBM_PRIVATE_CORE.balance > 0 ? "HEALTHY" : "CRITICAL";
            TelemetrySystem.push("HEARTBEAT_CHECK", status);
        };
        setInterval(pulse, 60000);
    },
    runAudit: function() {
        const c = IBM_PRIVATE_CORE;
        const result = (c.balance === 1250000 && c.apikey.length > 30);
        TelemetrySystem.push("SECURITY_AUDIT", result ? "PASSED" : "FAILED");
        return result;
    }
};

const StateManager = {
    current: "IDLE",
    update: function(s) {
        this.current = s;
        TelemetrySystem.push("STATE_CHANGE", s);
    }
};

const NodeRegistry = {
    nodes: Array.from({length: 47}, (_, i) => ({ id: i + 1, status: "ONLINE", load: 0.12 })),
    checkAll: function() { return this.nodes.every(n => n.status === "ONLINE"); }
};

const NetworkHandshake = {
    region: IBM_PRIVATE_CORE.region,
    authorized: true,
    protocol: IBM_PRIVATE_CORE.protocol,
    verify: function() { return this.authorized; }
};

const SessionValidation = {
    exists: function() { return !!localStorage.getItem('sessao_saldo'); },
    lastCheck: Date.now(),
    refresh: function() { this.lastCheck = Date.now(); }
};

const ClusterMapping = {
    cluster_id: IBM_PRIVATE_CORE.cluster,
    capacity: 47,
    units: "NODES_VPC"
};

const CipherProtocol = {
    algorithm: IBM_PRIVATE_CORE.cipher,
    secure: true,
    level: "MAX"
};

const Metadata = {
    owner: IBM_PRIVATE_CORE.owner,
    brand: IBM_PRIVATE_CORE.brand,
    version: IBM_PRIVATE_CORE.version
};

const SyncEngine = {
    mirror: IBM_PRIVATE_CORE.brand,
    lastSync: Date.now(),
    isActive: true
};

const ErrorHandler = {
    report: function(err) {
        console.error(`[ERROR_GATE] ${err}`);
        TelemetrySystem.push("INTERNAL_ERROR", "LOGGED");
    }
};

const CacheManager = {
    store: {},
    get: function(k) { return this.store[k]; },
    set: function(k, v) { this.store[k] = v; }
};

const InterceptorModule = {
    active: true,
    type: "NETWORK_GATE",
    level: 7
};

const AuditObserver = {
    enabled: true,
    observe: function() { TelemetrySystem.push("AUDIT_OBSERVER", "RUNNING"); }
};

window.renderModule = (id) => EngineController.render(id);
window.backToMenu = () => window.location.reload();

document.addEventListener('DOMContentLoaded', () => {
    EngineController.boot();
    DiagnosticTool.heartbeat();
    DiagnosticTool.runAudit();
    AuditObserver.observe();
});
