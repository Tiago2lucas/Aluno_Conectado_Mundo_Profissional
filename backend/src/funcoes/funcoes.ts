import crypto from 'crypto';
import { supabase } from '../config/supabase.js'; // Ajuste o caminho para subir até a sua pasta config

export const gerarMatriculaUnica = async (ano: number) => {
  // 1. Conta quantos alunos já existem para definir o próximo sequencial
  const { count, error } = await supabase
    .from('alunos')
    .select('*', { count: 'exact', head: true });

  if (error) throw new Error(`Erro ao calcular sequência: ${error.message}`);

  const proximoSequencial = String((count || 0) + 1).padStart(2, '0'); // Garante formato 01, 02...

  // 2. Gera 5 caracteres aleatórios
  const sufixoAleatorio = crypto.randomBytes(3).toString('hex').slice(0, 5);

  // 3. Monta o padrão: ALU-[ANO]-A-[SEQUENCIAL][ALEATORIO]
  return `ALU-${ano}-A-${proximoSequencial}${sufixoAleatorio}`;
};