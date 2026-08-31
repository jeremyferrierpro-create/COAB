import { Router } from 'express';
import { getVolunteerReports, createVolunteerReport } from '../controllers/volunteer.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Routes protégées par l'authentification
router.use(authenticateToken);

// Récupérer les rapports (filtrés par le bénévole, ou tous pour l'admin)
router.get('/reports', getVolunteerReports);

// Créer un nouveau rapport de suivi
router.post('/report', createVolunteerReport);

export default router;
