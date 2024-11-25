import Joi from 'joi';

export const usuarioSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(8).required(),
  cpf: Joi.string().length(11).required(),
  dataNascimento: Joi.date().required(),
});