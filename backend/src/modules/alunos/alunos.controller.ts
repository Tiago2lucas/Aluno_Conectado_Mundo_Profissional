import { FastifyReply, FastifyRequest } from 'fastify';
import * as AlunoService from './alunos.service.js';

export const getAlunos = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const alunos = await AlunoService.listarAlunos();
    return reply.status(200).send(alunos);
  } catch (error: any) {
    return reply.status(500).send({ error: error.message });
  }
};


export const createAluno = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const dados = request.body as any; // No futuro, vamos tipar isso melhor
    const novoAluno = await AlunoService.criarAluno(dados);
    return reply.status(201).send(novoAluno);
  } catch (error: any) {
    return reply.status(400).send({ error: error.message });
  }
};