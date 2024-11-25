import jwt from "jsonwebtoken";
import 'dotenv/config';

const secret = process.env.JWT_SECRET

if (!secret) {
  throw new Error("A chave JWT_SECRET não está definida corretamente no .env");
}

export const gerarToken = (id: number, nome: string): string => {
  return jwt.sign({ id, nome }, secret, { expiresIn: "1h" });
};

export const verificarToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (erro) {
    throw new Error("Token inválido ou expirado");
  }
};
