"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactions = exports.mockWebhook = exports.createCheckoutSession = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const client_1 = require("@prisma/client");
const createCheckoutSession = async (req, res, next) => {
    try {
        const { amount, description, type, matchId } = req.body;
        const userId = req.user.id;
        if (!amount || !type) {
            res.status(400).json({ error: 'Montant et type requis' });
            return;
        }
        // Création de la transaction en base (Mock de la session Stripe)
        const transaction = await prisma_1.default.financialTransaction.create({
            data: {
                userId,
                matchId: matchId || null,
                type: type,
                amount: parseFloat(amount),
                paymentProvider: client_1.PaymentProvider.STRIPE,
                status: client_1.TransactionStatus.PENDING
            }
        });
        // On retourne une fausse URL de checkout. En production, on appellerait le SDK Stripe.
        const mockCheckoutUrl = `${process.env.API_URL || 'http://localhost:3000'}/api/payments/mock-webhook/${transaction.id}`;
        res.json({ url: mockCheckoutUrl });
    }
    catch (error) {
        next(error);
    }
};
exports.createCheckoutSession = createCheckoutSession;
const mockWebhook = async (req, res, next) => {
    try {
        const id = req.params.id;
        // Simuler le traitement du webhook (succès du paiement)
        await prisma_1.default.financialTransaction.update({
            where: { id },
            data: {
                status: client_1.TransactionStatus.COMPLETED,
                paidAt: new Date()
            }
        });
        // Rediriger l'utilisateur vers son dashboard avec un paramètre de succès
        // (Dans un vrai flux, Stripe le fait, ici on le fait en direct)
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        res.redirect(`${frontendUrl}/dashboard?payment=success`);
    }
    catch (error) {
        next(error);
    }
};
exports.mockWebhook = mockWebhook;
const getTransactions = async (req, res, next) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'ADMIN') {
            res.status(403).json({ error: 'Accès non autorisé' });
            return;
        }
        const transactions = await prisma_1.default.financialTransaction.findMany({
            orderBy: { paidAt: 'desc' },
            include: {
                user: { select: { firstName: true, lastName: true, email: true } },
                match: true
            }
        });
        res.json(transactions);
    }
    catch (error) {
        next(error);
    }
};
exports.getTransactions = getTransactions;
//# sourceMappingURL=payment.controller.js.map