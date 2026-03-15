const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function consultarSaldo() {
  const apiKey = process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim();
  const url = process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim();

  const authenticator = new IamAuthenticator({ apikey: apiKey });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(url);

  try {
    const response = await service.getDocument({
      db: 'users',
      docId: '71b51e0c6f951946f3a3d513d9d3b6ad' 
    });

    console.log(`🏦 BANCO DIGITAL - CONSULTA DE SALDO`);
    console.log(`👤 Cliente: ${response.result.nome}`);
    console.log(`💰 Saldo Atual: R$ ${response.result.saldo.toFixed(2)}`);
  } catch (err) {
    console.error("❌ Erro ao consultar saldo:", err.message);
    process.exit(1);
  }
}

consultarSaldo();
