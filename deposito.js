const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function realizarDeposito() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    // 1. Busca a conta atual (que tem R$ 600)
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    // 2. Adiciona R$ 5.000,00
    console.log(`💰 Saldo anterior: R$ ${conta.saldo.toFixed(2)}`);
    conta.saldo += 5000.00; 

    // 3. Salva o novo saldo (R$ 5.600,00) na IBM
    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    
    console.log(`✅ Depósito de R$ 5.000,00 realizado com sucesso!`);
    console.log(`🚀 Novo Saldo: R$ ${conta.saldo.toFixed(2)}`);
  } catch (err) {
    console.error("❌ Erro no depósito:", err.message);
  }
}
realizarDeposito();
