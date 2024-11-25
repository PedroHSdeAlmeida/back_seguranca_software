import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController';
import { authenticateJWT } from '../middleware/autenticar';

const router = Router();

router.post('/', UsuarioController.registrar);
router.get('/:id', authenticateJWT, UsuarioController.obterUsuario);
router.put('/:id', authenticateJWT, UsuarioController.atualizarUsuario);
router.delete('/deletar-logico/:id', authenticateJWT, UsuarioController.deletarLogicoUsuario); // n precisa conectar essa com o front
router.delete('/deletar-permanente/:id', authenticateJWT, UsuarioController.deletarPermanenteUsuario);

export default router;
