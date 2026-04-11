const SETTINGS = {
    auth_protocol: "TLS-1.3",
    encryption: "AES-256-GCM",
    total_services: 47,
    categories: 7,
    brand_color: "#cc092f",
    default_action: "OK",
    refresh_rate: 30,
    ui: {
        font_main: "13px",
        font_links: "12px",
        font_legal: "10px",
        icon_max_size: "18px",
        weight: "900",
        family: "'IBM Plex Sans', sans-serif"
    }
};

const FinanceKernel = {
    init: function() {
        this.secureInputs();
        this.updateIdentity();
        this.clearBuffer();
        this.applyCorporateStyle();
        this.filterScripts();
        this.syncInterface();
        this.enforceScalingRules();
        this.startMonitor();
    },
    secureInputs: function() {
        const restricted = ["1.250.000", "1250000", "1,25", "1.25", "1.250"];
        const observer = new MutationObserver((list) => {
            document.querySelectorAll('input, textarea, select, .balance-display, .amount').forEach(field => {
                if (restricted.some(val => (field.value || field.innerText || "").includes(val))) {
                    if (field.tagName === "INPUT" || field.tagName === "TEXTAREA") {
                        field.value = "";
                    } else {
                        field.innerText = "---";
                    }
                    field.setAttribute("autocomplete", "off");
                }
            });
            this.applyCorporateStyle();
        });
        observer.observe(document.documentElement, { 
            childList: true, 
            subtree: true, 
            attributes: true 
        });
    },
    applyCorporateStyle: function() {
        const elements = document.querySelectorAll('button, a, span, div, b, h1, h2, h3, p, label, td, th, img, i, svg');
        const dictionary = {
            "02. PROCESSAMENTO DE NODES": "02. GESTÃO DE CONTA CORRENTE",
            "03. INFRAESTRUTURA LOGÍSTICA": "03. OPERAÇÕES DE FOMENTO",
            "04. AUDITORIA E COMPLIANCE": "04. INVESTIMENTOS CORPORATIVOS",
            "05. PROTOCOLOS DE SEGURANÇA": "05. CÂMBIO E OPERAÇÕES EXTERNAS",
            "06. GESTÃO DE ACESSO TIA": "06. SEGURANÇA E ACESSO TIA",
            "07. CREDENCIAMENTO DE ESCRITA": "07. ABERTURA DE CONTA MASTER",
            "NODE_POOL": "CARTEIRA",
            "SUBSEÇÃO": "SERVIÇO",
            "SINCROIZADO MASTER SUPREME": "OPERACIONAL",
            "MASTER SUPREME": "CORPORATIVO",
            "PRIVATE CLUSTER": "INTERNET BANKING",
            "ACIONAR SUBSEÇÃO TIA": "VALIDAR ACESSO TIA"
        };
        elements.forEach(el => {
            let content = (el.innerText || "").toUpperCase();
            if (content.includes("CNPJ") || content.includes("LTDA") || content.includes("ENGENHARIA")) {
                el.style.setProperty('font-size', SETTINGS.ui.font_legal, 'important');
                el.style.setProperty('color', '#666666', 'important');
                return;
            }
            if (el.tagName === "IMG" || el.tagName === "SVG" || el.tagName === "I") {
                el.style.setProperty('max-width', SETTINGS.ui.icon_max_size, 'important');
                el.style.setProperty('max-height', SETTINGS.ui.icon_max_size, 'important');
                el.style.setProperty('width', 'auto', 'important');
                el.style.setProperty('height', 'auto', 'important');
            }
            el.style.setProperty('font-size', SETTINGS.ui.font_main, 'important');
            el.style.setProperty('font-family', SETTINGS.ui.family, 'important');
            if (el.tagName === "A") {
                el.style.setProperty('font-size', SETTINGS.ui.font_links, 'important');
                el.style.setProperty('text-decoration', 'none', 'important');
            }
            for (let [dirty, clean] of Object.entries(dictionary)) {
                if (content.includes(dirty)) {
                    el.innerText = el.innerText.replace(new RegExp(dirty, 'gi'), clean);
                }
            }
            if (content.includes("CONFIRMAR") || content.includes("ABRIR") || content === "OK" || content.includes("ACIONAR") || content.includes("VALIDAR")) {
                el.style.setProperty('background-color', SETTINGS.brand_color, 'important');
                el.style.setProperty('color', '#ffffff', 'important');
                el.style.setProperty('font-weight', SETTINGS.ui.weight, 'important');
                el.style.setProperty('padding', '6px 14px', 'important');
                el.style.setProperty('border-radius', '2px', 'important');
                el.style.setProperty('text-transform', 'uppercase', 'important');
                el.style.setProperty('border', 'none', 'important');
                el.style.setProperty('cursor', 'pointer', 'important');
            }
        });
    },
    enforceScalingRules: function() {
        const style = document.createElement('style');
        style.id = "engecema-ui-lock";
        style.textContent = `
            * { font-size: ${SETTINGS.ui.font_main} !important; box-sizing: border-box !important; }
            a { font-size: ${SETTINGS.ui.font_links} !important; }
            h1, h2, h3 { font-size: 16px !important; margin: 5px 0 !important; }
            img, svg, .icon { max-width: ${SETTINGS.ui.icon_max_size} !important; height: auto !important; }
            .cnpj-footer { font-size: ${SETTINGS.ui.font_legal} !important; }
            input { height: 28px !important; padding: 2px 8px !important; }
        `;
        if (!document.getElementById(style.id)) {
            document.head.appendChild(style);
        }
    },
    updateIdentity: function() {
        document.title = "Engecema | Internet Banking Corporativo Master";
    },
    clearBuffer: function() {
        const auth = localStorage.getItem('engecema_status');
        if (auth !== "AUTHORIZED_V31") {
            const keys = ['sessao_saldo', 'engecema_tk', 'engecema_token', 'master_supreme_key'];
            keys.forEach(k => localStorage.removeItem(k));
        }
    },
    filterScripts: function() {
        window.addEventListener('beforescriptexecute', (e) => {
            if (e.target.src && e.target.src.includes('bradesco')) e.preventDefault();
        }, true);
    },
    syncInterface: function() {
        const root = document.documentElement;
        root.style.setProperty('--primary-enge', SETTINGS.brand_color);
        root.style.setProperty('--font-main', SETTINGS.ui.family);
    },
    startMonitor: function() {
        setInterval(() => {
            this.applyCorporateStyle();
            this.enforceScalingRules();
        }, SETTINGS.refresh_rate);
    }
};

const ServiceRegistry = {
    S_01: { id: "EC-01", name: "Fluxo de Caixa", cat: 1 },
    S_02: { id: "EC-02", name: "Extrato Corrente", cat: 1 },
    S_03: { id: "EC-03", name: "Saldos Disponíveis", cat: 1 },
    S_04: { id: "EC-04", name: "Transferências PIX", cat: 1 },
    S_05: { id: "EC-05", name: "Pagamento Fornecedor", cat: 1 },
    S_06: { id: "EC-06", name: "Agendamentos", cat: 1 },
    S_07: { id: "EC-07", name: "DDA / Boletos", cat: 1 },
    S_08: { id: "EC-08", name: "Antecipação Recebíveis", cat: 2 },
    S_09: { id: "EC-09", name: "Análise de Sacados", cat: 2 },
    S_10: { id: "EC-10", name: "Operações de Fomento", cat: 2 },
    S_11: { id: "EC-11", name: "Limites de Crédito", cat: 2 },
    S_12: { id: "EC-12", name: "Contratos Digitais", cat: 2 },
    S_13: { id: "EC-13", name: "Borderôs Digitais", cat: 2 },
    S_14: { id: "EC-14", name: "Recompra de Ativos", cat: 2 },
    S_15: { id: "EC-15", name: "Capital de Giro PJ", cat: 3 },
    S_16: { id: "EC-16", name: "BNDES Repasse", cat: 3 },
    S_17: { id: "EC-17", name: "Crédito Rural", cat: 3 },
    S_18: { id: "EC-18", name: "Financ. Imobiliário", cat: 3 },
    S_19: { id: "EC-19", name: "Leasing Estruturado", cat: 3 },
    S_20: { id: "EC-20", name: "Garantia Bancária", cat: 3 },
    S_21: { id: "EC-21", name: "Microcrédito Emp.", cat: 3 },
    S_22: { id: "EC-22", name: "CDB Corporativo", cat: 4 },
    S_23: { id: "EC-23", name: "Fundos de Invest.", cat: 4 },
    S_24: { id: "EC-24", name: "Previdência PJ", cat: 4 },
    S_25: { id: "EC-25", name: "Renda Variável", cat: 4 },
    S_26: { id: "EC-26", name: "Tesouro Direto", cat: 4 },
    S_27: { id: "EC-27", name: "Debêntures", cat: 4 },
    S_28: { id: "EC-28", name: "COE Estruturado", cat: 4 },
    S_29: { id: "EC-29", name: "Remessas Exterior", cat: 5 },
    S_30: { id: "EC-30", name: "Cartão Multinacional", cat: 5 },
    S_31: { id: "EC-31", name: "Hedge Cambial", cat: 5 },
    S_32: { id: "EC-32", name: "Taxas On-line", cat: 5 },
    S_33: { id: "EC-33", name: "Ordens de Pagamento", cat: 5 },
    S_34: { id: "EC-34", name: "Swift / BIC Code", cat: 5 },
    S_35: { id: "EC-35", name: "Arbitragem", cat: 5 },
    S_36: { id: "EC-36", name: "Seguro Garantia", cat: 6 },
    S_37: { id: "EC-37", name: "Vida em Grupo", cat: 6 },
    S_38: { id: "EC-38", name: "Patrimonial", cat: 6 },
    S_39: { id: "EC-39", name: "Responsab. Civil", cat: 6 },
    S_40: { id: "EC-40", name: "Seguro Agrícola", cat: 6 },
    S_41: { id: "EC-41", name: "Saúde Empresarial", cat: 6 },
    S_42: { id: "EC-42", name: "Custódia de Ativos", cat: 7 },
    S_43: { id: "EC-43", name: "Escrituração de Cotas", cat: 7 },
    S_44: { id: "EC-44", name: "Agente Fiduciário", cat: 7 },
    S_45: { id: "EC-45", name: "Gestão de Lastro", cat: 7 },
    S_46: { id: "EC-46", name: "Confirmação Senha Master", cat: 7 },
    S_47: { id: "EC-47", name: "Abertura Conta Corporativa", cat: 7 }
};

const SecurityCore = {
    protocol: "TLS-1.3",
    encryption: "AES-256",
    firewall: "ACTIVE"
};

const SystemMetadata = {
    owner: "ENGECEMA ENGENHARIA",
    version: "2026.1.3",
    sync_status: "MASTER_SYNC"
};

const Bootstrap = {
    run: function() {
        if (Object.keys(ServiceRegistry).length === 47) {
            FinanceKernel.init();
        }
    }
};

Bootstrap.run();
