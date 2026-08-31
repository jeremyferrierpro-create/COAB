import { Router } from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser, updateOnboarding, getMe, updateMe, createUserAdmin, updateUserAdmin, saveSignature } from '../controllers/user.controller';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

// L'administrateur peut tout faire
router.get('/', authenticateToken, requireRole(['ADMIN']), getAllUsers);
// Profil de l'utilisateur connecté
router.get('/me', authenticateToken, getMe);
router.put('/me', authenticateToken, updateMe);
router.post('/signature', authenticateToken, saveSignature);

router.get('/:id', authenticateToken, getUserById);
router.post('/admin', authenticateToken, requireRole(['ADMIN']), createUserAdmin);
router.put('/:id/admin', authenticateToken, requireRole(['ADMIN']), updateUserAdmin);
router.put('/:id', authenticateToken, requireRole(['ADMIN']), updateUser);
router.delete('/:id', authenticateToken, deleteUser);

// Onboarding utilisateur
router.post('/:id/onboarding', authenticateToken, updateOnboarding);

export default router;
