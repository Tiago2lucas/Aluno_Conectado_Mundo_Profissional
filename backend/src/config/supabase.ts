import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';


dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;


if (!supabaseUrl || !supabaseKey) {
  throw new Error('Erro crítico de infraestrutura: SUPABASE_URL e SUPABASE_KEY precisam estar configuradas no arquivo .env');
}


export const supabase = createClient(supabaseUrl, supabaseKey);