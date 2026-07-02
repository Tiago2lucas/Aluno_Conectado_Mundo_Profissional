import { app } from './app.js';


const PORT = Number(process.env.PORT) || 3333;

const startServer = async () => {
  try {
    
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`\n🚀 [SERVER RUNNING] Back-end rodando com sucesso em http://localhost:${PORT}`);
    console.log(`🔍 [QA CHECK] Rota de teste disponível em: http://localhost:${PORT}/ping\n`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();