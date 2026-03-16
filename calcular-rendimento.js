const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function renderSaldo() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    const cdiAnual = 0.1490; // 14.90%
    const cdiDiario = Math.pow(1 + cdiAnual, 1/252) - 1; // Cálculo de juros compostos diários
    
    const rendimento = conta.saldo * cdiDiario;
    console.log(`📈 PROCESSANDO RENDIMENTO CDB`);
    console.log(`💰 Saldo Base: R$ ${conta.saldo.toFixed(2)}`);
    
    conta.saldo += rendimento;

    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    console.log(`✅ Rendimento de R$ ${rendimento.toFixed(4)} creditado na conta!`);
  } catch (err) {
    console.error("❌ Erro no cálculo de rendimento:", err.message);
  }
}
renderSaldo();
