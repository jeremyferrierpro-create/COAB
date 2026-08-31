import { Router } from 'express';
import { getMatchesForSenior, getMatchesForJunior, createMatch } from '../controllers/matching.controller';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

// Routes protégées par l'authentification
// L'accès Admin pourrait être requis, ou l'utilisateur lui-même
router.get('/senior/:seniorId', authenticateToken, getMatchesForSenior);
router.get('/junior/:juniorId', authenticateToken, getMatchesForJunior);
router.post('/create', authenticateToken, requireRole(['ADMIN']), createMatch);

export default router;
