const SETTINGS = {
    auth_protocol: "TLS-1.3",
    encryption: "AES-256-GCM",
    total_services: 47,
    categories: 7,
    brand_color: "#cc092f",
    default_action: "OK",
    refresh_rate: 10,
    ui: {
        font_main: "13px",
        font_links: "12px",
        font_legal: "10px",
        font_header: "16px",
        icon_max: "16px",
        tab_h: "26px",
        row_h: "22px",
        header_h: "48px",
        weight_bold: "900",
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
        this.enforceAbsoluteUIScale();
        this.startMonitor();
    },
    secureInputs: function() {
        const restricted = [
            "1.250.000", 
            "1250000", 
            "1,25", 
            "1.25", 
            "1.250"
        ];
        const observer = new MutationObserver(() => {
            const targets = document.querySelectorAll('input, textarea, select, span, div, p, td, b, h1, h2, h3, .amount, .balance');
            targets.forEach(node => {
                const content = (node.value || node.innerText || "").toUpperCase();
                if (restricted.some(val => content.includes(val))) {
                    if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
                        node.value = "";
                        node.blur();
                    } else if (node.children.length === 0) {
                        node.innerText = "---";
                    }
                }
            });
        });
        observer.observe(document.documentElement, { 
            childList: true, 
            subtree: true, 
            attributes: true,
            characterData: true 
        });
    },
    applyCorporateStyle: function() {
        const elements = document.querySelectorAll('button, a, span, div, b, h1, h2, h3, p, label, td, th, img, svg, li, input');
        const dictionary = {
            "02. PROCESSAMENTO DE NODES": "02. CONTA CORRENTE CORPORATIVA",
            "03. INFRAESTRUTURA LOGÍSTICA": "03. OPERAÇÕES DE FOMENTO",
            "04. AUDITORIA E COMPLIANCE": "04. INVESTIMENTOS E RENDA FIXA",
            "05. PROTOCOLOS DE SEGURANÇA": "05. CÂMBIO E REMESSAS EXTERNAS",
            "06. GESTÃO DE ACESSO TIA": "06. CENTRAL DE SEGURANÇA TIA",
            "07. CREDENCIAMENTO DE ESCRITA": "07. ABERTURA DE CONTA MASTER",
            "NODE_POOL": "CARTEIRA",
            "SUBSEÇÃO": "SERVIÇO",
            "SINCROIZADO MASTER SUPREME": "OPERACIONAL",
            "MASTER SUPREME": "CORPORATIVO MASTER",
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
            for (let [dirty, clean] of Object.entries(dictionary)) {
                if (content.includes(dirty)) {
                    el.innerText = el.innerText.replace(new RegExp(dirty, 'gi'), clean);
                }
            }
            if (content.includes("CONFIRMAR") || content.includes("ABRIR") || content === "OK" || content.includes("ACIONAR") || content.includes("VALIDAR")) {
                el.style.setProperty('background-color', SETTINGS.brand_color, 'important');
                el.style.setProperty('color', '#ffffff', 'important');
                el.style.setProperty('font-weight', SETTINGS.ui.weight_bold, 'important');
                el.style.setProperty('font-size', SETTINGS.ui.font_main, 'important');
                el.style.setProperty('padding', '4px 12px', 'important');
                el.style.setProperty('border-radius', '2px', 'important');
                el.style.setProperty('border', 'none', 'important');
                el.style.setProperty('cursor', 'pointer', 'important');
                el.style.setProperty('text-transform', 'uppercase', 'important');
            }
        });
    },
    enforceAbsoluteUIScale: function() {
        let styleTag = document.getElementById("engecema-structural-lock");
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = "engecema-structural-lock";
            document.head.appendChild(styleTag);
        }
        styleTag.textContent = `
            html, body { font-size: ${SETTINGS.ui.font_main} !important; line-height: 1.2 !important; height: 100% !important; }
            * { 
                font-size: ${SETTINGS.ui.font_main} !important; 
                font-family: ${SETTINGS.ui.family} !important; 
                box-sizing: border-box !important;
                max-height: 1000000px !important;
            }
            a, .link, .btn-link { font-size: ${SETTINGS.ui.font_links} !important; text-decoration: none !important; }
            .aba, .tab, [class*="tab"], [class*="menu-item"], .nav-link, .tabs-header li { 
                height: ${SETTINGS.ui.tab_h} !important; 
                min-height: ${SETTINGS.ui.tab_h} !important;
                padding: 0 10px !important; 
                display: inline-flex !important;
                align-items: center !important;
                font-size: ${SETTINGS.ui.font_links} !important;
                margin: 0 1px !important;
                border: 1px solid transparent !important;
            }
            header, .header, .top-bar, .nav-bar { 
                height: ${SETTINGS.ui.header_h} !important; 
                min-height: ${SETTINGS.ui.header_h} !important; 
                display: flex !important;
                align-items: center !important;
            }
            img, svg, i, [class*="icon"], .svg-icon, .company-logo { 
                width: auto !important;
                height: auto !important;
                max-width: ${SETTINGS.ui.icon_max} !important; 
                max-height: ${SETTINGS.ui.icon_max} !important; 
            }
            table, .grid-container, .data-table { width: 100% !important; border-collapse: collapse !important; }
            table tr, table td, table th, .row, .cell { 
                height: ${SETTINGS.ui.row_h} !important; 
                padding: 2px 6px !important; 
                line-height: 1 !important;
                vertical-align: middle !important;
            }
            input, select, textarea { 
                height: 24px !important; 
                padding: 0 8px !important; 
                font-size: ${SETTINGS.ui.font_main} !important;
                border: 1px solid #ccc !important;
                border-radius: 2px !important;
            }
            h1 { font-size: ${SETTINGS.ui.font_header} !important; margin: 6px 0 !important; }
            h2 { font-size: 15px !important; margin: 4px 0 !important; }
            h3 { font-size: 14px !important; margin: 2px 0 !important; }
            .container, .main, #app, .content-wrapper { max-width: 1440px !important; margin: 0 auto !important; }
            .footer, footer, #footer { font-size: ${SETTINGS.ui.font_legal} !important; padding: 8px !important; height: auto !important; }
        `;
    },
    updateIdentity: function() {
        document.title = "Engecema | Master Corporate Banking";
    },
    clearBuffer: function() {
        const state = localStorage.getItem('engecema_status');
        if (state !== "AUTHORIZED_V31") {
            const keys = ['sessao_saldo', 'engecema_tk', 'engecema_token', 'master_supreme_key', 'temp_vault'];
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
        root.style.setProperty('--base-font', SETTINGS.ui.family);
    },
    startMonitor: function() {
        setInterval(() => {
            this.applyCorporateStyle();
            this.enforceAbsoluteUIScale();
        }, SETTINGS.refresh_rate);
    }
};

const ServiceRegistry = {
    S_01: { id: "EC-01", name: "Fluxo de Caixa", cat: 1, type: "CORE" },
    S_02: { id: "EC-02", name: "Extrato Corrente", cat: 1, type: "CORE" },
    S_03: { id: "EC-03", name: "Saldos Disponíveis", cat: 1, type: "CORE" },
    S_04: { id: "EC-04", name: "Transferências PIX", cat: 1, type: "CORE" },
    S_05: { id: "EC-05", name: "Pagamento Fornecedor", cat: 1, type: "CORE" },
    S_06: { id: "EC-06", name: "Agendamentos", cat: 1, type: "CORE" },
    S_07: { id: "EC-07", name: "DDA / Boletos", cat: 1, type: "CORE" },
    S_08: { id: "EC-08", name: "Antecipação Recebíveis", cat: 2, type: "FOMENTO" },
    S_09: { id: "EC-09", name: "Análise de Sacados", cat: 2, type: "FOMENTO" },
    S_10: { id: "EC-10", name: "Operações de Fomento", cat: 2, type: "FOMENTO" },
    S_11: { id: "EC-11", name: "Limites de Crédito", cat: 2, type: "FOMENTO" },
    S_12: { id: "EC-12", name: "Contratos Digitais", cat: 2, type: "FOMENTO" },
    S_13: { id: "EC-13", name: "Borderôs Digitais", cat: 2, type: "FOMENTO" },
    S_14: { id: "EC-14", name: "Recompra de Ativos", cat: 2, type: "FOMENTO" },
    S_15: { id: "EC-15", name: "Capital de Giro PJ", cat: 3, type: "CREDIT" },
    S_16: { id: "EC-16", name: "BNDES Repasse", cat: 3, type: "CREDIT" },
    S_17: { id: "EC-17", name: "Crédito Rural", cat: 3, type: "CREDIT" },
    S_18: { id: "EC-18", name: "Financ. Imobiliário", cat: 3, type: "CREDIT" },
    S_19: { id: "EC-19", name: "Leasing Estruturado", cat: 3, type: "CREDIT" },
    S_20: { id: "EC-20", name: "Garantia Bancária", cat: 3, type: "CREDIT" },
    S_21: { id: "EC-21", name: "Microcrédito Emp.", cat: 3, type: "CREDIT" },
    S_22: { id: "EC-22", name: "CDB Corporativo", cat: 4, type: "INVEST" },
    S_23: { id: "EC-23", name: "Fundos de Invest.", cat: 4, type: "INVEST" },
    S_24: { id: "EC-24", name: "Previdência PJ", cat: 4, type: "INVEST" },
    S_25: { id: "EC-25", name: "Renda Variável", cat: 4, type: "INVEST" },
    S_26: { id: "EC-26", name: "Tesouro Direto", cat: 4, type: "INVEST" },
    S_27: { id: "EC-27", name: "Debêntures", cat: 4, type: "INVEST" },
    S_28: { id: "EC-28", name: "COE Estruturado", cat: 4, type: "INVEST" },
    S_29: { id: "EC-29", name: "Remessas Exterior", cat: 5, type: "EXCHANGE" },
    S_30: { id: "EC-30", name: "Cartão Multinacional", cat: 5, type: "EXCHANGE" },
    S_31: { id: "EC-31", name: "Hedge Cambial", cat: 5, type: "EXCHANGE" },
    S_32: { id: "EC-32", name: "Taxas On-line", cat: 5, type: "EXCHANGE" },
    S_33: { id: "EC-33", name: "Ordens de Pagamento", cat: 5, type: "EXCHANGE" },
    S_34: { id: "EC-34", name: "Swift / BIC Code", cat: 5, type: "EXCHANGE" },
    S_35: { id: "EC-35", name: "Arbitragem", cat: 5, type: "EXCHANGE" },
    S_36: { id: "EC-36", name: "Seguro Garantia", cat: 6, type: "INSURANCE" },
    S_37: { id: "EC-37", name: "Vida em Grupo", cat: 6, type: "INSURANCE" },
    S_38: { id: "EC-38", name: "Patrimonial", cat: 6, type: "INSURANCE" },
    S_39: { id: "EC-39", name: "Responsab. Civil", cat: 6, type: "INSURANCE" },
    S_40: { id: "EC-40", name: "Seguro Agrícola", cat: 6, type: "INSURANCE" },
    S_41: { id: "EC-41", name: "Saúde Empresarial", cat: 6, type: "INSURANCE" },
    S_42: { id: "EC-42", name: "Custódia de Ativos", cat: 7, type: "SERVICE" },
    S_43: { id: "EC-43", name: "Escrituração de Cotas", cat: 7, type: "SERVICE" },
    S_44: { id: "EC-44", name: "Agente Fiduciário", cat: 7, type: "SERVICE" },
    S_45: { id: "EC-45", name: "Gestão de Lastro", cat: 7, type: "SERVICE" },
    S_46: { id: "EC-46", name: "Senha Master Corporativa", cat: 7, type: "ACCESS" },
    S_47: { id: "EC-47", name: "Abertura Conta Master", cat: 7, type: "ACCESS" }
};

const Bootstrap = {
    run: function() {
        if (Object.keys(ServiceRegistry).length === 47) {
            FinanceKernel.init();
        }
    }
};

Bootstrap.run();
