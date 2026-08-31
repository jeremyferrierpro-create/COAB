"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// L'administrateur peut tout faire
router.get('/', auth_middleware_1.authenticateToken, (0, auth_middleware_1.requireRole)(['ADMIN']), user_controller_1.getAllUsers);
// Profil de l'utilisateur connecté
router.get('/me', auth_middleware_1.authenticateToken, user_controller_1.getMe);
router.put('/me', auth_middleware_1.authenticateToken, user_controller_1.updateMe);
router.post('/signature', auth_middleware_1.authenticateToken, user_controller_1.saveSignature);
router.get('/:id', auth_middleware_1.authenticateToken, user_controller_1.getUserById);
router.post('/admin', auth_middleware_1.authenticateToken, (0, auth_middleware_1.requireRole)(['ADMIN']), user_controller_1.createUserAdmin);
router.put('/:id/admin', auth_middleware_1.authenticateToken, (0, auth_middleware_1.requireRole)(['ADMIN']), user_controller_1.updateUserAdmin);
router.put('/:id', auth_middleware_1.authenticateToken, (0, auth_middleware_1.requireRole)(['ADMIN']), user_controller_1.updateUser);
router.delete('/:id', auth_middleware_1.authenticateToken, user_controller_1.deleteUser);
// Onboarding utilisateur
router.post('/:id/onboarding', auth_middleware_1.authenticateToken, user_controller_1.updateOnboarding);
// Valider le dossier d'un utilisateur (Admin)
router.post('/:id/validate', auth_middleware_1.authenticateToken, (0, auth_middleware_1.requireRole)(['ADMIN']), user_controller_1.validateProfile);
exports.default = router;
//# sourceMappingURL=user.routes.js.map