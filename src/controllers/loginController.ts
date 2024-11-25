import { Request, Response } from "express";
import { UsuarioService } from "../services/usuarioService";
import { comparesenha } from "../utils/criptografia";
import { gerarToken } from "../config/jwt";
import { loginSchema } from "./validators/loginValidator";

const usuarioService = new UsuarioService();

export const login = async (req: Request, res: Response): Promise<void> => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    res.status(400).json({ erro: "Dados inválidos", detalhes: error.details });
    return;
  }

  try {
    const { email_user, senha_user } = req.body;
    const usuario = await usuarioService.obterUsuarioPorEmail(email_user);

    if (!usuario) {
      res.status(401).json({ erro: "Credenciais inválidas" });
      return;
    }

    const issenhaValid = await comparesenha(senha_user, usuario.senha);

    if (!issenhaValid) {
      res.status(401).json({ erro: "Credenciais inválidas" });
      return;
    }

    const usuarioId = usuario.id;
    const token = gerarToken(usuarioId, usuario.nome);

    res.status(200).json({ token, id: usuarioId, nome: usuario.nome });
  } catch (erro) {
    if (erro instanceof Error) {
      res.status(500).json({ erro: "Erro ao fazer login", detalhes: erro.message });
    } else {
      res.status(500).json({ erro: "Erro ao fazer login" });
    }
  }
};