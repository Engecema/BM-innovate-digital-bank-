const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function processarCashback() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    const ultimoGasto = 150.00; 
    const valorCashback = ultimoGasto * 0.01; // 1% de retorno

    console.log(`💰 CALCULANDO RECOMPENSA...`);
    conta.saldo += valorCashback;
    conta.cashback_acumulado = (conta.cashback_acumulado || 0) + valorCashback;

    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    console.log(`✅ Cashback de R$ ${valorCashback.toFixed(2)} creditado!`);
  } catch (err) {
    console.error("❌ Erro no cashback:", err.message);
  }
}
processarCashback();
