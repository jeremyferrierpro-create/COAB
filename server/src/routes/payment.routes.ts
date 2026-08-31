import { Router } from 'express';
import { createCheckoutSession, mockWebhook, getTransactions } from '../controllers/payment.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Création d'une session de paiement
router.post('/create-checkout-session', authenticateToken, createCheckoutSession);

// Simulation de retour Webhook après paiement réussi sur la page Mock
router.get('/mock-webhook/:id', mockWebhook);

// Récupérer toutes les transactions (Admin)
router.get('/transactions', authenticateToken, getTransactions);

export default router;
