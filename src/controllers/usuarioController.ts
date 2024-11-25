import { Request, Response, NextFunction, RequestHandler } from 'express';
import { UsuarioService } from '../services/usuarioService';
import { usuarioSchema } from './validators/usuarioValidator';

export class UsuarioController {
  static registrar: RequestHandler = async (req, res) => {
    try {
      const { error, value } = usuarioSchema.validate(req.body);

      if (error) {
        res.status(400).json({ mensagem: 'Dados inválidos.', erro: error.details });
        return;
      }

      const usuario = await new UsuarioService().criarUsuario(value);
      res.status(201).json(usuario);
    } catch (error: any) {
      res.status(400).json({ mensagem: 'Erro ao criar usuário.', erro: error.message });
    }
  };

  static obterUsuario: RequestHandler = async (req, res, next) => {
    try {
      const usuario = await new UsuarioService().obterUsuarioPorId(Number(req.params.id));

      if (!usuario || usuario.deletado) {
        res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        return;
      }

      res.json(usuario);
    } catch (error: any) {
      res.status(500).json({ mensagem: 'Erro interno do servidor.', erro: error.message });
    }
  };

  static atualizarUsuario: RequestHandler = async (req, res, next) => {
    try {
      const { error, value } = usuarioSchema.validate(req.body);

      if (error) {
        res.status(400).json({ mensagem: 'Dados inválidos.', erro: error.details });
        return;
      }

      const usuario = await new UsuarioService().atualizarUsuario(Number(req.params.id), value);
      res.json(usuario);
    } catch (error: any) {
      res.status(400).json({ mensagem: 'Erro ao atualizar usuário.', erro: error.message });
    }
  };

  static deletarLogicoUsuario: RequestHandler = async (req, res, next) => {
    try {
      await new UsuarioService().deletarLogicoUsuario(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ mensagem: 'Erro interno do servidor.', erro: error.message });
    }
  };

  static deletarPermanenteUsuario: RequestHandler = async (req, res, next) => {
    try {
      await new UsuarioService().deletarPermanenteUsuario(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ mensagem: 'Erro interno do servidor.', erro: error.message });
    }
  };
}
