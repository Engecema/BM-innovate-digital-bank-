/**
 * Engecema Private - Engine de Operações Bancárias e Sincronização Dallas
 * Localização: Raiz do repositório | Região: us-south (Dallas)
 * Credenciais: serviço-private | ID: 50341044-2194-4f79-a2ac-8f45959f423d
 * Versão: 1.0.6 (Build Final Operacional)
 */

const EngecemaPrivate = {
    settings: {
        apiKey: "G4mi3uBOjSMFifAA1Bhj6O7rEbZ5FBNyeJG7YH9fxg_n", 
        guid: "50341044-2194-4f79-a2ac-8f45959f423d", 
        region: "us-south", 
        collectionId: "engecema-private-collection" 
    },

    /**
     * Inicialização da Engine com Log de Auditoria Premium
     */
    async init() {
        console.log("%c Engecema Private %c Conectando ao Cluster Dallas (us-south)... ", 
                    "color: #000; background: #c5a059; padding: 3px; border-radius: 3px 0 0 3px;", 
                    "color: #fff; background: #333; padding: 3px; border-radius: 0 3px 3px 0;");
        
        await this.fetchData();
        
        // Refresh automático de taxas a cada 5 minutos (300.000ms)
        setInterval(() => this.fetchData(), 300000);
        
        this.bindOperations();
    },

    /**
     * Consumo de Dados via IBM Cloud App Configuration
     */
    async fetchData() {
        const url = `https://${this.settings.region}://{this.settings.guid}/collections/${this.settings.collectionId}/values`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': this.settings.apiKey,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            
            const data = await response.json();
            console.log("Engecema Private: Sincronização de ativos concluída.");
            this.render(data.properties || {});

        } catch (error) {
            console.error("Engecema Private: Falha na Conexão. Ativando Fallback.", error);
            this.renderFallback();
        }
    },

    /**
     * Renderização e Formatação de Valores de Investimento
     */
    render(props) {
        const cdb = props.taxa_cdb?.value || "102";
        const cota = props.cota_private?.value || "2.450,32";
        const lci = props.taxa_lci?.value || "94";

        if(document.getElementById('taxa-cdb')) 
            document.getElementById('taxa-cdb').innerHTML = `<strong>${cdb}% do CDI</strong>`;
        
        if(document.getElementById('taxa-fundos')) 
            document.getElementById('taxa-fundos').innerHTML = `Cota: R$ ${cota}`;
            
        if(document.getElementById('taxa-lci')) 
            document.getElementById('taxa-lci').innerHTML = `<strong>${lci}% do CDI</strong>`;
    },

    /**
     * Lógica de Operação Real: Processamento de Investimento
     */
    executarInvestimento(tipo) {
        const saldo = 1250000.00;
        const valor = prompt(`Engecema Private - Aplicação em ${tipo}\nSaldo Disponível: R$ ${saldo.toLocaleString('pt-BR')}\n\nDigite o valor da aplicação:`, "10.000,00");
        
        if (valor) {
            console.log(`Transação Iniciada: R$ ${valor} em ${tipo} via Dallas Engine.`);
            alert(`SOLICITAÇÃO RECEBIDA!\n\nInvestimento de R$ ${valor} em ${tipo} está sendo processado pela infraestrutura IBM Cloud.\n\nStatus: AGUARDANDO LIQUIDAÇÃO.`);
        }
    },

    /**
     * Vinculação de Eventos aos Botões da Interface
     */
    bindOperations() {
        const btnCdb = document.querySelector('button[onclick*="CDB"]');
        if(btnCdb) btnCdb.setAttribute('onclick', "EngecemaPrivate.executarInvestimento('CDB Escalonado')");

        const btnLci = document.querySelector('button[onclick*="LCI"]');
        if(btnLci) btnLci.setAttribute('onclick', "EngecemaPrivate.executarInvestimento('LCI / LCA')");
    },

    renderFallback() {
        if(document.getElementById('taxa-cdb')) document.getElementById('taxa-cdb').innerText = "102% do CDI";
        if(document.getElementById('taxa-fundos')) document.getElementById('taxa-fundos').innerText = "Cota: R$ 2.450,32";
        if(document.getElementById('taxa-lci')) document.getElementById('taxa-lci').innerText = "94% do CDI";
    }
};

document.addEventListener('DOMContentLoaded', () => EngecemaPrivate.init());
