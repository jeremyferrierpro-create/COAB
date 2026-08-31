import { Router } from 'express';
import { generateContract, generateCharter, generateReceipt, generateNotice, getLegalMatches, setupContract, sendDocuments } from '../controllers/legal.controller';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

// Routes protégées (Administrateur uniquement)
router.get('/matches', authenticateToken, requireRole(['ADMIN']), getLegalMatches);

router.get('/contract/:matchId', authenticateToken, requireRole(['ADMIN']), generateContract);
router.get('/charter/:matchId', authenticateToken, requireRole(['ADMIN']), generateCharter);
router.post('/receipt/:matchId', authenticateToken, requireRole(['ADMIN']), generateReceipt);
router.post('/payment-notice/:matchId', authenticateToken, requireRole(['ADMIN']), generateNotice);
router.put('/setup-contract/:matchId', authenticateToken, requireRole(['ADMIN']), setupContract);
router.post('/send-documents/:matchId', authenticateToken, requireRole(['ADMIN']), sendDocuments);

export default router;
