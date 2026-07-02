import fastify from 'fastify';
import { alunoRoutes } from './modules/alunos/alunos.routes.js';
// Instancia o Fastify ativando o Logger nativo para rastreabilidade de requisições e erros
const app = fastify({
  logger: true
});

app.get('/ping', async (request, reply) => {
  return { 
    status: 'online', 
    timestamp: new Date().toISOString(),
    context: 'Aluno Conectado Back-end' 
  };
});

app.register(alunoRoutes, { prefix: '/api' });






// No futuro próximo, registraremos as rotas dos módulos aqui embaixo

export { app };