const express = require('express');
const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// 1. Conexão Limpa com Cloudant V2 (Usa os Secrets do GitHub/IBM)
const authenticator = new IamAuthenticator({
    apikey: process.env.CLOUDANT_API_KEY_V2
});

const cloudant = CloudantV1.newInstance({
    authenticator: authenticator
});
cloudant.setServiceUrl(process.env.CLOUDANT_URL_V2);

// 2. Servir arquivos estáticos (Seu index.html e logo.png)
app.use(express.static(path.join(__dirname, '/')));

// 3. Rota de API para buscar Perfil e Saldo (Frente 2)
app.get('/api/perfil', async (req, res) => {
    try {
        // Busca na pasta 'usuarios' (ajuste o docId conforme seu teste depois)
        const userDoc = await cloudant.getDocument({
            db: 'usuarios',
            docId: 'perfil_teste' 
        });

        // Busca na pasta 'transacoes' para somar o saldo
        const transacoes = await cloudant.postPartitionAllDocs({
            db: 'transacoes',
            partitionKey: 'perfil_teste'
        });

        res.json({
            nome: userDoc.result.nome_completo,
            saldo: userDoc.result.saldo_atual // Ou lógica de soma das transações
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao acessar Cloudant V2" });
    }
});

app.listen(port, () => {
    console.log(`Servidor Engecema rodando na porta ${port}`);
});
