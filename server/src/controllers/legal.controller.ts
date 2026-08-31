import { Request, Response } from 'express';
import { generateElanContract, generateCohabilisCharter, generateRentReceipt, generatePaymentNotice } from '../services/pdf.service';
import prisma from '../lib/prisma';

export const getLegalMatches = async (req: Request, res: Response): Promise<void> => {
  try {
    const matches = await prisma.match.findMany({
      where: {
        status: {
          in: ['SUGGESTED', 'MEETING_SCHEDULED', 'TRIAL_PERIOD', 'ACTIVE']
        }
      },
      include: {
        senior: { include: { user: true } },
        junior: { include: { user: true } },
        documents: true
      },
      orderBy: { startDate: 'desc' }
    });
    res.json(matches);
  } catch (error) {
    console.error('Error fetching legal matches:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des dossiers.' });
  }
};

const getMatchDetails = async (matchId: string) => {
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: {
      senior: { include: { user: true } },
      junior: { include: { user: true } }
    }
  });
  if (!match) throw new Error('Match introuvable');
  return {
    seniorName: `${match.senior.user.firstName} ${match.senior.user.lastName}`,
    juniorName: `${match.junior.user.firstName} ${match.junior.user.lastName}`,
    formula: match.housingFormula,
    rentAmount: match.rentAmount || 0,
    chargesAmount: match.chargesAmount || 0,
    paidServices: match.paidServices || [],
    seniorSignature: match.senior.user.signatureBase64,
    juniorSignature: match.junior.user.signatureBase64
  };
};

export const generateContract = async (req: Request, res: Response): Promise<void> => {
  try {
    const matchId = req.params.matchId as string;
    const { seniorName, juniorName, formula, seniorSignature, juniorSignature, rentAmount, chargesAmount, paidServices } = await getMatchDetails(matchId);
    const date = new Date().toLocaleDateString('fr-FR');

    const pdfBytes = await generateElanContract(matchId, seniorName, juniorName, formula, date, seniorSignature, juniorSignature, rentAmount, chargesAmount, paidServices);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Contrat_ELAN_${matchId}.pdf"`);
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Error generating contract:', error);
    res.status(500).json({ error: 'Erreur lors de la génération du contrat' });
  }
};

export const generateCharter = async (req: Request, res: Response): Promise<void> => {
  try {
    const matchId = req.params.matchId as string;
    const { seniorName, juniorName, seniorSignature, juniorSignature } = await getMatchDetails(matchId);
    const date = new Date().toLocaleDateString('fr-FR');

    const pdfBytes = await generateCohabilisCharter(matchId, seniorName, juniorName, date, seniorSignature, juniorSignature);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Charte_Cohabilis_${matchId}.pdf"`);
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Error generating charter:', error);
    res.status(500).json({ error: 'Erreur lors de la génération de la charte' });
  }
};

export const generateReceipt = async (req: Request, res: Response): Promise<void> => {
  try {
    const matchId = req.params.matchId as string;
    const { period } = req.body;
    const { juniorName, seniorName, rentAmount, chargesAmount } = await getMatchDetails(matchId);
    const date = new Date().toLocaleDateString('fr-FR');

    const pdfBytes = await generateRentReceipt(matchId, juniorName, seniorName, rentAmount, chargesAmount, period || 'Ce mois-ci', date);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Quittance_${period || 'mois'}.pdf"`);
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Error generating receipt:', error);
    res.status(500).json({ error: 'Erreur lors de la génération de la quittance' });
  }
};

export const generateNotice = async (req: Request, res: Response): Promise<void> => {
  try {
    const matchId = req.params.matchId as string;
    const { period } = req.body;
    const { juniorName, seniorName, rentAmount, chargesAmount } = await getMatchDetails(matchId);
    const date = new Date().toLocaleDateString('fr-FR');

    const pdfBytes = await generatePaymentNotice(matchId, juniorName, seniorName, rentAmount, chargesAmount, period || 'Ce mois-ci', date);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Avis_Paiement_${period || 'mois'}.pdf"`);
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Error generating payment notice:', error);
    res.status(500).json({ error: 'Erreur lors de la génération de l\'avis de paiement' });
  }
};

export const setupContract = async (req: Request, res: Response): Promise<void> => {
  try {
    const matchId = req.params.matchId as string;
    const { rentAmount, chargesAmount, contractType, paidServices, startDate, endDate } = req.body;

    const updatedMatch = await prisma.match.update({
      where: { id: matchId },
      data: {
        rentAmount: rentAmount ? parseFloat(rentAmount) : null,
        chargesAmount: chargesAmount ? parseFloat(chargesAmount) : null,
        contractType,
        paidServices: paidServices || [],
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    res.json(updatedMatch);
  } catch (error) {
    console.error('Error setting up contract:', error);
    res.status(500).json({ error: 'Erreur lors de la configuration du contrat' });
  }
};

export const sendDocuments = async (req: Request, res: Response): Promise<void> => {
  try {
    const matchId = req.params.matchId as string;
    // We would normally generate the PDF and send the email here.
    // For now, we simulate success as requested.
    
    // Simulate updating status
    const match = await prisma.match.update({
      where: { id: matchId },
      data: {
        status: 'ACTIVE' // or another status like SIGNATURE_PENDING
      }
    });

    res.json({ message: 'Documents générés et envoyés pour signature (Simulation)', match });
  } catch (error) {
    console.error('Error sending documents:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi des documents' });
  }
};