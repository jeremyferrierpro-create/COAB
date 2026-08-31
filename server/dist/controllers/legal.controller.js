"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDocuments = exports.setupContract = exports.generateNotice = exports.generateReceipt = exports.generateCharter = exports.generateContract = exports.getLegalMatches = void 0;
const pdf_service_1 = require("../services/pdf.service");
const prisma_1 = __importDefault(require("../lib/prisma"));
const getLegalMatches = async (req, res) => {
    try {
        const matches = await prisma_1.default.match.findMany({
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
    }
    catch (error) {
        console.error('Error fetching legal matches:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des dossiers.' });
    }
};
exports.getLegalMatches = getLegalMatches;
const getMatchDetails = async (matchId) => {
    const match = await prisma_1.default.match.findUnique({
        where: { id: matchId },
        include: {
            senior: { include: { user: true } },
            junior: { include: { user: true } }
        }
    });
    if (!match)
        throw new Error('Match introuvable');
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
const generateContract = async (req, res) => {
    try {
        const matchId = req.params.matchId;
        const { seniorName, juniorName, formula, seniorSignature, juniorSignature, rentAmount, chargesAmount, paidServices } = await getMatchDetails(matchId);
        const date = new Date().toLocaleDateString('fr-FR');
        const pdfBytes = await (0, pdf_service_1.generateElanContract)(matchId, seniorName, juniorName, formula, date, seniorSignature, juniorSignature, rentAmount, chargesAmount, paidServices);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="Contrat_ELAN_${matchId}.pdf"`);
        res.send(Buffer.from(pdfBytes));
    }
    catch (error) {
        console.error('Error generating contract:', error);
        res.status(500).json({ error: 'Erreur lors de la génération du contrat' });
    }
};
exports.generateContract = generateContract;
const generateCharter = async (req, res) => {
    try {
        const matchId = req.params.matchId;
        const { seniorName, juniorName, seniorSignature, juniorSignature } = await getMatchDetails(matchId);
        const date = new Date().toLocaleDateString('fr-FR');
        const pdfBytes = await (0, pdf_service_1.generateCohabilisCharter)(matchId, seniorName, juniorName, date, seniorSignature, juniorSignature);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="Charte_Cohabilis_${matchId}.pdf"`);
        res.send(Buffer.from(pdfBytes));
    }
    catch (error) {
        console.error('Error generating charter:', error);
        res.status(500).json({ error: 'Erreur lors de la génération de la charte' });
    }
};
exports.generateCharter = generateCharter;
const generateReceipt = async (req, res) => {
    try {
        const matchId = req.params.matchId;
        const { period } = req.body;
        const { juniorName, seniorName, rentAmount, chargesAmount } = await getMatchDetails(matchId);
        const date = new Date().toLocaleDateString('fr-FR');
        const pdfBytes = await (0, pdf_service_1.generateRentReceipt)(matchId, juniorName, seniorName, rentAmount, chargesAmount, period || 'Ce mois-ci', date);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="Quittance_${period || 'mois'}.pdf"`);
        res.send(Buffer.from(pdfBytes));
    }
    catch (error) {
        console.error('Error generating receipt:', error);
        res.status(500).json({ error: 'Erreur lors de la génération de la quittance' });
    }
};
exports.generateReceipt = generateReceipt;
const generateNotice = async (req, res) => {
    try {
        const matchId = req.params.matchId;
        const { period } = req.body;
        const { juniorName, seniorName, rentAmount, chargesAmount } = await getMatchDetails(matchId);
        const date = new Date().toLocaleDateString('fr-FR');
        const pdfBytes = await (0, pdf_service_1.generatePaymentNotice)(matchId, juniorName, seniorName, rentAmount, chargesAmount, period || 'Ce mois-ci', date);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="Avis_Paiement_${period || 'mois'}.pdf"`);
        res.send(Buffer.from(pdfBytes));
    }
    catch (error) {
        console.error('Error generating payment notice:', error);
        res.status(500).json({ error: 'Erreur lors de la génération de l\'avis de paiement' });
    }
};
exports.generateNotice = generateNotice;
const setupContract = async (req, res) => {
    try {
        const matchId = req.params.matchId;
        const { rentAmount, chargesAmount, contractType, paidServices, startDate, endDate } = req.body;
        const updatedMatch = await prisma_1.default.match.update({
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
    }
    catch (error) {
        console.error('Error setting up contract:', error);
        res.status(500).json({ error: 'Erreur lors de la configuration du contrat' });
    }
};
exports.setupContract = setupContract;
const sendDocuments = async (req, res) => {
    try {
        const matchId = req.params.matchId;
        // We would normally generate the PDF and send the email here.
        // For now, we simulate success as requested.
        // Simulate updating status
        const match = await prisma_1.default.match.update({
            where: { id: matchId },
            data: {
                status: 'ACTIVE' // or another status like SIGNATURE_PENDING
            }
        });
        res.json({ message: 'Documents générés et envoyés pour signature (Simulation)', match });
    }
    catch (error) {
        console.error('Error sending documents:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi des documents' });
    }
};
exports.sendDocuments = sendDocuments;
//# sourceMappingURL=legal.controller.js.map