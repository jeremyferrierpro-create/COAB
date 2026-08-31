import { Router } from 'express';
import { uploadDocument, downloadDocument, getUserDocuments } from '../controllers/document.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Routes protégées par authentification
router.use(authenticateToken);

// Uploader un nouveau document
router.post('/upload', uploadDocument);

// Liste des documents de l'utilisateur
router.get('/me', getUserDocuments);

// Télécharger/Voir un document
router.get('/:id/download', downloadDocument);

export default router;
