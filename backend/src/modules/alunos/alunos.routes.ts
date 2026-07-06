import { FastifyInstance } from 'fastify';
import * as AlunoController from './alunos.controller.js';

export async function alunoRoutes(app: FastifyInstance) {
  app.get('/alunos', AlunoController.getAlunos);
  app.post('/alunos', AlunoController.createAluno);
  app.put('/alunos/:matricula', AlunoController.updateAlunoMatricula);
}