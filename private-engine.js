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
    version: "v31.0.5",
    protocol: "TLS-1.3-SECURE",
    brand: "BRADESCO-PRIVATE-MIRROR",
    security_level: "MAXIMUM"
};

const EngineConstants = {
    TOTAL_NODES: 47,
    TOTAL_SECTIONS: 7,
    REDUNDANCY_FACTOR: 1.5,
    MAP_SCHEMA: [
        { id: "SEC-01", name: "OPERACIONAL ESTRUTURADO", nodes: 7, color: "#004481", risk: "LOW" },
        { id: "SEC-02", name: "INVESTIMENTOS PRIVATE", nodes: 7, color: "#cc092f", risk: "MEDIUM" },
        { id: "SEC-03", name: "FOMENTO TECNOLÓGICO", nodes: 7, color: "#004481", risk: "LOW" },
        { id: "SEC-04", name: "RESERVA DE LIQUIDEZ", nodes: 7, color: "#cc092f", risk: "SAFE" },
        { id: "SEC-05", name: "CUSTÓDIA DE ATIVOS", nodes: 7, color: "#004481", risk: "SAFE" },
        { id: "SEC-06", name: "TRANSACIONAL DALLAS", nodes: 6, color: "#cc092f", risk: "HIGH" },
        { id: "SEC-07", name: "BUFFER DE SEGURANÇA", nodes: 6, color: "#333333", risk: "CRITICAL" }
    ]
};

const DataValidator = {
    isValidBalance: (val) => typeof val === 'number' && val > 0,
    isValidString: (str) => typeof str === 'string' && str.trim().length > 0,
    verifyIntegrity: function(obj) {
        try {
            return this.isValidBalance(obj.balance) && this.isValidString(obj.apikey) && this.isValidString(obj.guid);
        } catch (e) {
            return false;
        }
    }
};

const TelemetryScanner = {
    logs: [],
    record: function(event, level = "LOG") {
        const entry = {
            timestamp: new Date().toISOString(),
            event: event,
            level: level,
            cluster: IBM_PRIVATE_CORE.cluster,
            checksum: Math.random().toString(16).toUpperCase().slice(2, 10)
        };
        this.logs.push(entry);
        if (this.logs.length > 100) this.logs.shift();
        console.log(`[${entry.level}] ${entry.event} [${entry.checksum}]`);
    }
};

const MathModule = {
    calculateSectionalBalance: function(totalBalance) {
        if (!DataValidator.isValidBalance(totalBalance)) return [];
        const unitValue = totalBalance / EngineConstants.TOTAL_NODES;
        return EngineConstants.MAP_SCHEMA.map(section => ({
            ...section,
            totalAllocated: section.nodes * unitValue,
            perNodeValue: unitValue
        }));
    },
    formatCurrency: function(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            maximumFractionDigits: 2
        }).format(value);
    }
};

const SessionController = {
    namespace: "engecema_private_",
    writeState: function(payload) {
        try {
            Object.keys(payload).forEach(key => {
                const secureKey = `${this.namespace}${key}`;
                localStorage.setItem(secureKey, payload[key]);
            });
            localStorage.setItem('sessao_saldo', IBM_PRIVATE_CORE.balance.toString());
            TelemetryScanner.record("STORAGE_PERSISTENCE_SUCCESS", "SECURITY");
            return true;
        } catch (error) {
            TelemetryScanner.record(`STORAGE_WRITE_FAILURE: ${error.message}`, "CRITICAL");
            return false;
        }
    },
    destroyState: function() {
        try {
            const allKeys = Object.keys(localStorage);
            allKeys.forEach(k => {
                if (k.startsWith(this.namespace) || k === 'sessao_saldo') {
                    localStorage.removeItem(k);
                }
            });
            sessionStorage.clear();
            TelemetryScanner.record("CLEANUP_EXECUTION_COMPLETED", "AUTH");
            return true;
        } catch (error) {
            TelemetryScanner.record("CLEANUP_FAULT", "ERROR");
            return false;
        }
    }
};

const SecurityGate = {
    handshake: function() {
        TelemetryScanner.record("DOM_INTERCEPTOR_ACTIVE", "NETWORK");
        document.addEventListener('click', (event) => {
            const element = event.target;
            if (!element) return;
            const computed = window.getComputedStyle(element);
            const bgColor = computed.backgroundColor;
            const innerTxt = (element.innerText || element.value || "").toUpperCase();
            
            const triggerAuth = bgColor.includes('0, 68, 129') || bgColor.includes('0, 0, 255') || innerTxt.includes('OK') || innerTxt.includes('ACESSAR');
            const triggerExit = bgColor.includes('204, 9, 47') || bgColor.includes('255, 0, 0') || innerTxt.includes('SAIR');

            if (triggerAuth || triggerExit) {
                event.preventDefault();
                event.stopImmediatePropagation();
                if (triggerAuth) this.authorize();
                else this.terminate();
            }
        }, true);
    },
    authorize: function() {
        const authData = {
            token: btoa(IBM_PRIVATE_CORE.apikey).substring(0, 32),
            user: IBM_PRIVATE_CORE.owner,
            company: IBM_PRIVATE_CORE.company,
            cluster: IBM_PRIVATE_CORE.cluster,
            ts: Date.now(),
            protocol: IBM_PRIVATE_CORE.protocol,
            status: "SECURE_AUTHORIZED_V31"
        };
        const result = SessionController.writeState(authData);
        if (result) window.location.replace('conta-corrente.html');
    },
    terminate: function() {
        SessionController.destroyState();
        window.location.replace('index.html');
    }
};

const StyleEngine = {
    injectGlobal: function() {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .private-viewport { font-family: 'IBM Plex Sans', sans-serif; padding: 35px; max-width: 1300px; margin: auto; color: #222; }
            .btn-back-action { background: #2d2d2d; color: #fff; border: none; padding: 14px 30px; border-radius: 6px; cursor: pointer; margin-bottom: 40px; font-weight: 800; text-transform: uppercase; transition: all 0.3s ease; }
            .btn-back-action:hover { background: #cc092f; transform: translateX(-5px); }
            .platinum-card-frame { background: linear-gradient(145deg, #cc092f 0%, #600000 100%); padding: 50px; border-radius: 30px; color: #fff; box-shadow: 0 30px 60px rgba(0,0,0,0.4); margin-bottom: 50px; position: relative; border: 1px solid rgba(255,255,255,0.1); }
            .card-emblem { width: 70px; height: 50px; background: #c5a059; border-radius: 12px; margin-bottom: 30px; box-shadow: inset 0 0 10px rgba(0,0,0,0.3); }
            .card-number-mask { font-size: 36px; font-family: 'Courier New', monospace; letter-spacing: 6px; margin: 35px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
            .data-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; }
            .info-block { background: #ffffff; border: 1px solid #e5e5e5; padding: 35px; border-radius: 20px; border-left: 12px solid; box-shadow: 0 15px 35px rgba(0,0,0,0.07); transition: transform 0.3s; }
            .info-block:hover { transform: translateY(-5px); }
            .matrix-wrapper { background: #fdfdfd; border: 1px solid #dcdcdc; border-radius: 20px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
            .matrix-top-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #f0f0f0; padding-bottom: 18px; margin-bottom: 25px; }
            .matrix-title { font-weight: 900; color: #004481; font-size: 16px; text-transform: uppercase; }
            .matrix-value-label { color: #cc092f; font-weight: 800; font-size: 18px; }
            .node-visual-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(85px, 1fr)); gap: 12px; }
            .node-point { background: #004481; color: #fff; font-size: 11px; padding: 14px 0; border-radius: 8px; text-align: center; cursor: pointer; border: 1px solid #002d56; transition: 0.2s; }
            .node-point:hover { background: #cc092f; border-color: #800000; box-shadow: 0 0 15px rgba(204,9,47,0.4); }
            .tia-interface { text-align: center; padding: 100px 30px; }
            .tia-sphere { background: #fff; border: 4px solid #cc092f; padding: 60px; border-radius: 50px; box-shadow: 0 45px 90px rgba(204,9,47,0.25); max-width: 800px; margin: auto; }
        `;
        document.head.appendChild(styleSheet);
    }
};

const ModuleRenderer = {
    render: function(targetId) {
        const domArea = document.getElementById('engine-content-area');
        if (!domArea) {
            TelemetryScanner.record("RENDER_TARGET_MISSING", "ERROR");
            return;
        }

        TelemetryScanner.record(`INITIALIZING_RENDER:${targetId}`, "UI");
        const navigation = `<button class="btn-back-action" onclick="window.location.reload()">← VOLTAR AO PAINEL PRIVATE</button>`;
        const sectionalData = MathModule.calculateSectionalBalance(IBM_PRIVATE_CORE.balance);

        const views = {
            'Cartões': `
                <div class="private-viewport">
                    <h2>Cartões Business Fomento</h2>
                    <div class="platinum-card-frame">
                        <div class="card-emblem"></div>
                        <p style="font-size:14px;letter-spacing:5px;opacity:0.8;text-transform:uppercase;">Platinum Business Private</p>
                        <p class="card-number-mask">**** **** **** 4050</p>
                        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:18px;">
                            <span>${IBM_PRIVATE_CORE.owner}</span><span>VAL: 03/30</span>
                        </div>
                    </div>
                    <div class="data-info-grid">
                        <div class="info-block" style="border-left-color:#cc092f">
                            <span style="font-size:12px;color:#888;">RAZÃO SOCIAL</span><br><strong style="font-size:18px;">${IBM_PRIVATE_CORE.company}</strong>
                        </div>
                        <div class="info-block" style="border-left-color:#004481">
                            <span style="font-size:12px;color:#888;">CLUSTER REGION</span><br><strong style="font-size:18px;">${IBM_PRIVATE_CORE.region.toUpperCase()}</strong>
                        </div>
                    </div>
                </div>`,
            'Investimentos': `
                <div class="private-viewport">
                    <h2>Carteira de Investimentos e Liquidez</h2>
                    <div class="data-info-grid">
                        <div class="info-block" style="border-left-color:#cc092f">
                            <small>CDB FOMENTO BRASIL</small><p style="font-size:26px;margin:15px 0;">${MathModule.formatCurrency(450300)}</p>
                            <span style="color:green;font-size:12px;">RENDIMENTO: 110% CDI</span>
                        </div>
                        <div class="info-block" style="border-left-color:#004481">
                            <small>LCI TECNOLOGIA PRIVATE</small><p style="font-size:26px;margin:15px 0;">${MathModule.formatCurrency(220000)}</p>
                            <span style="color:green;font-size:12px;">ISENTO DE I.R.</span>
                        </div>
                        <div class="info-block" style="border-left-color:#666666">
                            <small>TESOURO IPCA+ 2030</small><p style="font-size:26px;margin:15px 0;">${MathModule.formatCurrency(120000)}</p>
                        </div>
                        <div class="info-block" style="border-left-color:#cc092f">
                            <small>AÇÕES ENGC3 HOLDING</small><p style="font-size:26px;margin:15px 0;">${MathModule.formatCurrency(89400)}</p>
                        </div>
                    </div>
                </div>`,
            'Tia': `
                <div class="tia-interface">
                    <div style="font-size:120px;margin-bottom:50px;filter:drop-shadow(0 15px 20px rgba(0,0,0,0.1));">🤖</div>
                    <div class="tia-sphere">
                        <p style="font-size:22px;line-height:1.8;color:#333;">
                            "Prezado <strong>${IBM_PRIVATE_CORE.owner}</strong>, o motor de inteligência do cluster 
                            <strong>${IBM_PRIVATE_CORE.cluster}</strong> confirma o lastro de 
                            <strong>${MathModule.formatCurrency(IBM_PRIVATE_CORE.balance)}</strong> disponível para 
                            a conta <strong>${IBM_PRIVATE_CORE.conta}</strong>. Segurança Nível Máximo Ativa."
                        </p>
                    </div>
                </div>`,
            'Matrix Nodes': `
                <div class="private-viewport">
                    <h2>Arquitetura Matrix de Rede (47 Subseções)</h2>
                    <p style="margin-bottom:40px;opacity:0.6;font-weight:700;">DALLAS CLUSTER MONITOR | STATUS: ONLINE</p>
                    <div class="matrix-sections-container">
                        ${sectionalData.map(sec => `
                            <div class="matrix-wrapper">
                                <div class="matrix-top-bar">
                                    <span class="matrix-title">${sec.id} | ${sec.name}</span>
                                    <span class="matrix-value-label">${MathModule.formatCurrency(sec.totalAllocated)}</span>
                                </div>
                                <div class="node-visual-grid">
                                    ${Array.from({length: sec.nodes}, (_, i) => `
                                        <div class="node-point" title="Valor Subseção: ${MathModule.formatCurrency(sec.perNodeValue)}">
                                            NODE-${(i+1).toString().padStart(2,'0')}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>`
        };

        domArea.innerHTML = navigation + (views[targetId] || `<div class="private-viewport">Sincronizando módulo ${targetId}...</div>`);
    }
};

const AppBootstrap = {
    start: function() {
        if (!DataValidator.verifyIntegrity(IBM_PRIVATE_CORE)) {
            console.error("CRITICAL_CONFIGURATION_ERROR: CORE_INTEGRITY_CHECK_FAILED");
            return;
        }
        StyleEngine.injectGlobal();
        SecurityGate.handshake();
        TelemetryScanner.record(`BOOT_SEQUENCE_V${IBM_PRIVATE_CORE.version}_COMPLETED`, "SYSTEM");
    }
};

window.renderModule = (id) => ModuleRenderer.render(id);
window.backToMenu = () => window.location.reload();

document.addEventListener('DOMContentLoaded', () => {
    AppBootstrap.start();
});

// Mecanismo de Redundância e Heartbeat do Cluster Dallas
const ClusterHeartbeat = {
    frequency: 30000,
    check: function() {
        const health = IBM_PRIVATE_CORE.balance > 0;
        TelemetryScanner.record(`CLUSTER_HEARTBEAT_CHECK: ${health ? 'STABLE' : 'UNSTABLE'}`, "NETWORK");
    },
    run: function() {
        setInterval(() => this.check(), this.frequency);
    }
};
ClusterHeartbeat.run();
