import { supabase } from '../../config/supabase.js';

export const listarAlunos = async () => {
  const { data, error } = await supabase
    .from('alunos')
    .select('*');

  if (error) {
    throw new Error(`Erro ao buscar alunos: ${error.message}`);
  }

  return data;
};


export const criarAluno = async (dados: any) => {
    console.log("Dados recebidos no Service:", dados); 
  const { data, error } = await supabase
    .from('alunos')
    .insert([dados])
    .select();

  if (error) {
    console.error("Erro do Supabase:", error)
    throw new Error(`Erro ao criar aluno: ${error.message}`);
  }

  return data;
};

