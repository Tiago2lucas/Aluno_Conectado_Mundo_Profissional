import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Garante o carregamento das variáveis do arquivo .env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Validação de QA preventiva: impede o app de subir se as chaves estiverem faltando
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Erro crítico de infraestrutura: SUPABASE_URL e SUPABASE_KEY precisam estar configuradas no arquivo .env');
}

// Inicializa e exporta o cliente do Supabase totalmente tipado
export const supabase = createClient(supabaseUrl, supabaseKey);