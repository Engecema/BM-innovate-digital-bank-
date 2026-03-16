const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function processarVenda() {
  const apiKey = process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim();
  const url = process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim();

  const authenticator = new IamAuthenticator({ apikey: apiKey });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(url);

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    const valorVenda = 200.00;
    const taxa = conta.taxa_maquininha || 1.99;
    const valorDesconto = valorVenda * (taxa / 100);
    const valorLiquido = valorVenda - valorDesconto;

    console.log(`🏧 VENDA NA MAQUININHA`);
    console.log(`💰 Valor Bruto: R$ ${valorVenda.toFixed(2)}`);
    console.log(`📉 Taxa (${taxa}%): - R$ ${valorDesconto.toFixed(2)}`);
    
    // Atualiza o saldo real na IBM Cloud
    conta.saldo += valorLiquido;

    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    console.log(`✅ Depósito realizado! Novo saldo: R$ ${conta.saldo.toFixed(2)}`);
  } catch (err) {
    console.error("❌ Erro no processamento da venda:", err.message);
    process.exit(1);
  }
}
processarVenda();
