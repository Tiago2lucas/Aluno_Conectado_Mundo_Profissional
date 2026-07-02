import fastify from 'fastify';
import { alunoRoutes } from './modules/alunos/alunos.routes.js';

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





export { app };