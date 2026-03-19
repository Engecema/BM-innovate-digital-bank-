const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const AppConfiguration = require('ibm-appconfiguration-node-sdk');

const app = express();
app.use(cors());
app.use(express.json());

// 1. INICIALIZAÇÃO DO COFRE (App Configuration)
const clientAppConfig = AppConfiguration.getInstance();
clientAppConfig.init(
    'us-south', // Região Dallas conforme seu recurso
    '50341044-2194-4f79-a2ac-8f45959f423d', // SEU GUID
    'tL4h5JPtO0QwCdsmpGLgvBHHabvKq1PxVN9em0M_zUqO' // SUA API KEY DO SERVIÇO
);
clientAppConfig.setContext('producao', 'producao'); // ID da Coleção e ID da Coleção

// Servir o arquivo estático index.html se estiver na mesma pasta
app.use(express.static(path.join(__dirname)));

let tokensAtivos = {}; // Armazenamento temporário de tokens para validação rápida

// ROTA: REGISTRAR E ENVIAR TOKEN
app.post('/api/registrar', async (req, res) => {
    const { nome, email, cpf } = req.body;
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    tokensAtivos[cpf] = token;

    try {
        // BUSCANDO VALORES REAIS NO APP CONFIGURATION
        const cloudantUrl = clientAppConfig.getProperty('cloudant_url').getCurrentValue();
        const cloudantKey = clientAppConfig.getProperty('cloudant_apikey').getCurrentValue();
        const emailPass = clientAppConfig.getProperty('email_pass').getCurrentValue();

        // 2. CONEXÃO COM O CLOUDANT-YR
        const cloudant = CloudantV1.newInstance({
            authenticator: new IamAuthenticator({ apikey: cloudantKey }),
            serviceUrl: cloudantUrl
        });

        // SALVAR CLIENTE NO BANCO DE DADOS
        await cloudant.postDocument({
            db: 'clientes_engecema',
            document: { 
                nome, 
                email, 
                cpf, 
                status: 'AGUARDANDO_VALIDACAO', 
                criado_em: new Date().toISOString() 
            }
        });

        // 3. ENVIO DE E-MAIL VIA NODEMAILER
        // Nota: Substitua 'seu-email@gmail.com' pelo seu e-mail real configurado
        let transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: { 
                user: 'seu-email-aqui@gmail.com', 
                pass: emailPass 
            }
        });

        await transporter.sendMail({
            from: '"Engecema Private" <seu-email-aqui@gmail.com>',
            to: email,
            subject: "Seu Token de Segurança Engecema",
            text: `Olá ${nome}, seu código para ativar a conta é: ${token}`
        });

        res.status(200).json({ success: true, message: "Cadastro iniciado e token enviado." });

    } catch (error) {
        console.error("Erro no processamento Engecema:", error);
        res.status(500).json({ error: "Erro interno no servidor." });
    }
});

// ROTA: VALIDAR TOKEN
app.post('/api/validar', (req, res) => {
    const { cpf, token } = req.body;
    if (tokensAtivos[cpf] && tokensAtivos[cpf] === token) {
        delete tokensAtivos[cpf]; // Limpa após sucesso
        res.status(200).json({ valid: true });
    } else {
        res.status(401).json({ valid: false, message: "Token inválido ou expirado." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor Engecema rodando na porta ${PORT}`));
