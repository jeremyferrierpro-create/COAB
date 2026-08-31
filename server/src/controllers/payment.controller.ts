import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { TransactionType, PaymentProvider, TransactionStatus } from '@prisma/client';

export const createCheckoutSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { amount, description, type, matchId } = req.body;
    const userId = (req as any).user.id;

    if (!amount || !type) {
      res.status(400).json({ error: 'Montant et type requis' });
      return;
    }

    // Création de la transaction en base (Mock de la session Stripe)
    const transaction = await prisma.financialTransaction.create({
      data: {
        userId,
        matchId: matchId || null,
        type: type as TransactionType,
        amount: parseFloat(amount),
        paymentProvider: PaymentProvider.STRIPE,
        status: TransactionStatus.PENDING
      }
    });

    // On retourne une fausse URL de checkout. En production, on appellerait le SDK Stripe.
    const mockCheckoutUrl = `${process.env.API_URL || 'http://localhost:3000'}/api/payments/mock-webhook/${transaction.id}`;

    res.json({ url: mockCheckoutUrl });
  } catch (error) {
    next(error);
  }
};

export const mockWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Simuler le traitement du webhook (succès du paiement)
    await prisma.financialTransaction.update({
      where: { id },
      data: {
        status: TransactionStatus.COMPLETED,
        paidAt: new Date()
      }
    });

    // Rediriger l'utilisateur vers son dashboard avec un paramètre de succès
    // (Dans un vrai flux, Stripe le fait, ici on le fait en direct)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/dashboard?payment=success`);
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userRole = (req as any).user.role;
    
    if (userRole !== 'ADMIN') {
      res.status(403).json({ error: 'Accès non autorisé' });
      return;
    }

    const transactions = await prisma.financialTransaction.findMany({
      orderBy: { paidAt: 'desc' },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        match: true
      }
    });

    res.json(transactions);
  } catch (error) {
    next(error);
  }
};
