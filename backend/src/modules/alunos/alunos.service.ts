import { supabase } from '../../config/supabase.js';
import { gerarMatriculaUnica } from '../../funcoes/funcoes.js';

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
  console.log("Dados brutos vindos do Bruno:", dados); 

  try {
    const { ano, ...dadosDoAluno } = dados;

    // 1. TRAVA DE E-MAIL: Verifica se o e-mail já existe no banco
    const { data: alunoExistente, error: erroBusca } = await supabase
      .from('alunos')
      .select('email')
      .eq('email', dadosDoAluno.email)
      .maybeSingle(); // Retorna o registro se achar, ou null se não achar nada

    if (erroBusca) {
      console.error("Erro ao consultar e-mail:", erroBusca);
      throw new Error(`Erro na validação de e-mail: ${erroBusca.message}`);
    }

    // Se achou alguém com esse e-mail, barra o código aqui!
    if (alunoExistente) {
      throw new Error("Este e-mail já está cadastrado para outro aluno.");
    }

    // 2. Se o e-mail estiver livre, o código continua normalmente...
    const anoAluno = ano || 1; 

    // 3. Gera a matrícula
    const novaMatricula = await gerarMatriculaUnica(anoAluno);
    console.log(`Matrícula gerada: ${novaMatricula}`);

    // 4. Junta tudo para salvar
    const dadosComMatricula = {
      ...dadosDoAluno,
      matricula: novaMatricula
    };

    // 5. Salva no Supabase
    const { data, error } = await supabase
      .from('alunos')
      .insert([dadosComMatricula])
      .select();

    if (error) {
      console.error("Erro do Supabase:", error);
      throw new Error(`Erro ao criar aluno: ${error.message}`);
    }

    return data;
  } catch (error: any) {
    console.error("Erro no processo de criação:", error.message);
    throw error;
  }
};


export const atualizarAluno = async (matricula: string, dados: any) => {
  console.log("Dados recebidos para atualização no Service:", dados);
  
  const { data, error } = await supabase
    .from('alunos')
    .update(dados)
    .eq('matricula', matricula)
    .select();

  if (error) {
    console.error("Erro do Supabase ao atualizar:", error);
    throw new Error(`Erro ao atualizar aluno: ${error.message}`);
  }

  return data;
};