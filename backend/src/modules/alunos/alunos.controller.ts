import { FastifyReply, FastifyRequest } from 'fastify';
import * as AlunoService from './alunos.service.js';
import { atualizarAluno } from './alunos.service.js'


export const getAlunos = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const alunos = await AlunoService.listarAlunos();
    return reply.status(200).send(alunos);
  } catch (error: any) {
    return reply.status(500).send({ error: error.message });
  }
};

export const updateAlunoMatricula = async (request: FastifyRequest, reply: FastifyReply) => {
  const { matricula } = request.params as { matricula: string };
  const dados = request.body; // Pega o que vier no corpo da requisição

  console.log(`Controller: Tentando atualizar aluno com matrícula ${matricula}`, dados);

  try {
    const data = await atualizarAluno(matricula, dados);

    if (!data || data.length === 0) {
      return reply.status(404).send({ message: 'Aluno não encontrado com essa matrícula.' });
    }

    return reply.status(200).send({ 
      message: 'Aluno atualizado com sucesso!', 
      data: data[0] 
    });
  } catch (error: any) {
    return reply.status(400).send({ error: error.message });
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