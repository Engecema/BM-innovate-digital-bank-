const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function gerarDashboardCFO() {
  const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_API_KEY.replace(/['"]+/g, '').trim() });
  const service = CloudantV1.newInstance({ authenticator });
  service.setServiceUrl(process.env.CLOUDANT_URL.replace(/['"]+/g, '').trim());

  try {
    const doc = await service.getDocument({ db: 'users', docId: '71b51e0c6f951946f3a3d513d9d3b6ad' });
    let conta = doc.result;

    const patrimonioTotal = conta.saldo + (conta.custodia.crypto.valor_brl) + (conta.custodia.acoes.valor_brl);
    const liquidezImediata = conta.saldo;
    
    console.log(`📊 RELATÓRIO EXECUTIVO - ${conta.empresa.nome}`);
    console.log(`🏢 CNPJ: ${conta.empresa.cnpj}`);
    console.log("------------------------------------------");
    console.log(`💰 Patrimônio Consolidado: R$ ${patrimonioTotal.toFixed(2)}`);
    console.log(`💧 Liquidez Corrente: R$ ${liquidezImediata.toFixed(2)}`);
    console.log(`💳 Crédito Empresarial Disponível: R$ 50.000,00`);
    
    // IA Diagnóstico
    let diagnostico = patrimonioTotal > 4000 ? "EXCELENTE: Empresa com alta solvência e reserva de ativos." : "ALERTA: Necessário aporte de capital de giro.";
    
    conta.saude_financeira = diagnostico;
    await service.putDocument({ db: 'users', docId: conta._id, document: conta });
    
    console.log(`🤖 IA DIAGNÓSTICO: ${diagnostico}`);
  } catch (err) {
    console.error("❌ Erro no relatório corporativo:", err.message);
  }
}
gerarDashboardCFO();
