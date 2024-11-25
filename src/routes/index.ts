import { Router } from 'express';
import loginRoutes from './loginRoutes';
import usuarioRoutes from './usuarioRoutes';

const router = Router();

router.use('/login', loginRoutes);
router.use('/usuarios', usuarioRoutes);

export default router;
