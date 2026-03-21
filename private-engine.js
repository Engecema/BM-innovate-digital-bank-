/**
 * Engecema Private - Engine de Integração Bancária de Alta Performance
 * Região: Dallas (us-south) | Conexão: IBM App Configuration
 * Credenciais: serviço-private | ID: 50341044-2194-4f79-a2ac-8f45959f423d
 */

const EngecemaPrivate = {
    settings: {
        apiKey: "G4mi3uBOjSMFifAA1Bhj6O7rEbZ5FBNyeJG7YH9fxg_n", 
        guid: "50341044-2194-4f79-a2ac-8f45959f423d", 
        region: "us-south", 
        collectionId: "engecema-private-collection" 
    },

    /**
     * Inicialização da Engine e Sincronização Global
     */
    async init() {
        console.log("%c Engecema Private %c Conectando ao Cluster Dallas (us-south)... ", 
                    "color: #000; background: #c5a059; padding: 3px; border-radius: 3px 0 0 3px;", 
                    "color: #fff; background: #333; padding: 3px; border-radius: 0 3px 3px 0;");
        
        await this.fetchData();
        
        // Refresh inteligente a cada 5 minutos para manter as taxas atualizadas
        setInterval(() => this.fetchData(), 300000);
    },

    /**
     * Consumo de Dados via API REST da IBM Cloud App Configuration
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

            if (!response.ok) {
                throw new Error(`Erro na rede: ${response.status} - ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log("Engecema Private: Sincronização concluída com sucesso.");
            this.render(data.properties || {});

        } catch (error) {
            console.error("%c Engecema Private: Falha na Conexão ", "color: white; background: red;", error);
            this.renderFallback();
        }
    },

    /**
     * Renderização Dinâmica e Formatação de Valores Private
     */
    render(props) {
        // Mapeamento de IDs do App Configuration para o HTML
        const dataMap = {
            'taxa-cdb': { 
                val: props.taxa_cdb?.value || "102", 
                suffix: "% do CDI" 
            },
            'taxa-fundos': { 
                val: props.cota_private?.value || "2.450,32", 
                prefix: "Cota: R$ " 
            },
            'taxa-lci': { 
                val: props.taxa_lci?.value || "94", 
                suffix: "% do CDI" 
            }
        };

        Object.keys(dataMap).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                const item = dataMap[id];
                element.innerHTML = `<strong>${item.prefix || ''}${item.val}${item.suffix || ''}</strong>`;
            }
        });
    },

    /**
     * Procedimento de Segurança (Valores Padrão caso Dallas esteja offline)
     */
    renderFallback() {
        const fallbacks = [
            { id: 'taxa-cdb', text: "102% do CDI" },
            { id: 'taxa-fundos', text: "Cota: R$ 2.450,32" },
            { id: 'taxa-lci', text: "94% do CDI" }
        ];

        fallbacks.forEach(f => {
            const el = document.getElementById(f.id);
            if (el) el.innerText = f.text;
        });
    }
};

// Disparo Único na Carga do DOM
document.addEventListener('DOMContentLoaded', () => EngecemaPrivate.init());
