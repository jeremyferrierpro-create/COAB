"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Création d'une session de paiement
router.post('/create-checkout-session', auth_middleware_1.authenticateToken, payment_controller_1.createCheckoutSession);
// Simulation de retour Webhook après paiement réussi sur la page Mock
router.get('/mock-webhook/:id', payment_controller_1.mockWebhook);
// Récupérer toutes les transactions (Admin)
router.get('/transactions', auth_middleware_1.authenticateToken, payment_controller_1.getTransactions);
exports.default = router;
//# sourceMappingURL=payment.routes.js.map