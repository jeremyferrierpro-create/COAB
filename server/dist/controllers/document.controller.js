"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDocuments = exports.downloadDocument = exports.uploadDocument = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const client_1 = require("@prisma/client");
const uploadDocument = async (req, res, next) => {
    try {
        const { docType, fileData, matchId } = req.body;
        const userId = req.user.id;
        if (!docType || !fileData) {
            res.status(400).json({ error: 'Type de document et données du fichier requis.' });
            return;
        }
        // On s'assure que le type de document est valide
        if (!Object.values(client_1.DocumentType).includes(docType)) {
            res.status(400).json({ error: 'Type de document invalide.' });
            return;
        }
        const document = await prisma_1.default.document.create({
            data: {
                userId,
                matchId: matchId || null,
                docType: docType,
                fileUrl: `/api/documents/download/`, // L'ID sera ajouté plus tard
                fileData
            }
        });
        // On met à jour l'URL avec l'ID du document pour faciliter le téléchargement
        const updatedDocument = await prisma_1.default.document.update({
            where: { id: document.id },
            data: { fileUrl: `/api/documents/${document.id}/download` }
        });
        // Ne pas renvoyer le fileData car trop lourd
        const { fileData: _, ...safeDocument } = updatedDocument;
        res.status(201).json(safeDocument);
    }
    catch (error) {
        next(error);
    }
};
exports.uploadDocument = uploadDocument;
const downloadDocument = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userRole = req.user.role;
        const userId = req.user.id;
        const document = await prisma_1.default.document.findUnique({
            where: { id },
            include: { match: true }
        });
        if (!document) {
            res.status(404).json({ error: 'Document non trouvé' });
            return;
        }
        // Vérification des droits d'accès
        const isOwner = document.userId === userId;
        const isAdmin = userRole === 'ADMIN';
        const isMatchedUser = document.match?.seniorId === userId || document.match?.juniorId === userId;
        if (!isOwner && !isAdmin && !isMatchedUser) {
            res.status(403).json({ error: 'Accès non autorisé' });
            return;
        }
        if (!document.fileData) {
            res.status(404).json({ error: 'Fichier non trouvé en base' });
            return;
        }
        // Le fileData est censé être en Base64 (ex: data:application/pdf;base64,JVBERi0xLjQK...)
        // Extraire le mime-type et les données
        const fileDataStr = document.fileData;
        const matches = fileDataStr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            res.status(400).json({ error: 'Format de fichier invalide' });
            return;
        }
        const mimeType = matches[1];
        const buffer = Buffer.from(matches[2] || '', 'base64');
        // Définir les headers
        const mimeTypeStr = mimeType || 'application/octet-stream';
        let extension = 'bin';
        if (mimeTypeStr.includes('pdf'))
            extension = 'pdf';
        else if (mimeTypeStr.includes('png'))
            extension = 'png';
        else if (mimeTypeStr.includes('jpeg'))
            extension = 'jpg';
        res.setHeader('Content-Type', mimeTypeStr);
        res.setHeader('Content-Disposition', `attachment; filename="document_${id}.${extension}"`);
        res.send(buffer);
    }
    catch (error) {
        next(error);
    }
};
exports.downloadDocument = downloadDocument;
const getUserDocuments = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const documents = await prisma_1.default.document.findMany({
            where: { userId },
            orderBy: { id: 'desc' },
            select: {
                id: true,
                docType: true,
                fileUrl: true,
                matchId: true,
                signedAt: true,
                // Ne pas inclure fileData pour ne pas alourdir la requête
            }
        });
        res.json(documents);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserDocuments = getUserDocuments;
//# sourceMappingURL=document.controller.js.map