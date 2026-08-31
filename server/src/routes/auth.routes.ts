import { Router } from 'express';
import { login, seedDevUsers, register, registerSenior, registerJunior } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/register-senior', registerSenior);
router.post('/register-junior', registerJunior);
router.post('/seed', seedDevUsers); // Endpoint de dev

// Exemple de route protégée (pour valider le token au chargement frontend)
router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: (req as any).user });
});

export default router;
