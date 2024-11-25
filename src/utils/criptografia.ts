import * as bcrypt from 'bcrypt';

import { BCRYPT_SALT_ROUNDS } from '../config/encript';

export const hashsenha = async (senha: string): Promise<string> => {
  return await bcrypt.hash(senha, BCRYPT_SALT_ROUNDS);
};

export const comparesenha = async (senha: string, hashedsenha: string): Promise<boolean> => {
  return await bcrypt.compare(senha, hashedsenha);
};