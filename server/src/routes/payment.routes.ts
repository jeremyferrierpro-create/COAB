import { Router } from 'express';
import { createCheckoutSession, mockWebhook, getTransactions } from '../controllers/payment.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Création d'une session de paiement
router.post('/create-checkout-session', authenticate, createCheckoutSession);

// Simulation de retour Webhook après paiement réussi sur la page Mock
router.get('/mock-webhook/:id', mockWebhook);

// Récupérer toutes les transactions (Admin)
router.get('/transactions', authenticate, getTransactions);

export default router;
