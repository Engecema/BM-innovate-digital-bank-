const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function remessaInternacional() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    const valorRemessa = 1000.00;
    const spread = 0.04; // 4% de lucro do banco
    const iof = 0.011;   // 1.1% de imposto (IOF)
    
    const taxasTotais = valorRemessa * (spread + iof);
    const custoFinal = valorRemessa + taxasTotais;

    if (conta.saldo >= custoFinal) {
      console.log(`🌎 REMESSA INTERNACIONAL`);
      console.log(`💰 Valor enviado: R$ ${valorRemessa.toFixed(2)}`);
      console.log(`💸 Taxas + IOF: R$ ${taxasTotais.toFixed(2)}`);
      
      conta.saldo -= custoFinal;

      await service.putDocument({ db: 'users', docId: conta._id, document: conta });
      console.log(`✅ Sucesso! Novo saldo pós-remessa: R$ ${conta.saldo.toFixed(2)}`);
    } else {
      console.log("❌ Saldo insuficiente para cobrir a remessa e os impostos.");
    }
  } catch (err) {
    console.error("❌ Erro no processamento SWIFT:", err.message);
  }
}
remessaInternacional();
