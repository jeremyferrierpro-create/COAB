"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const legal_controller_1 = require("../controllers/legal.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Routes protégées (Administrateur uniquement)
router.get('/matches', auth_middleware_1.authenticateToken, (0, auth_middleware_1.requireRole)(['ADMIN']), legal_controller_1.getLegalMatches);
router.get('/contract/:matchId', auth_middleware_1.authenticateToken, (0, auth_middleware_1.requireRole)(['ADMIN']), legal_controller_1.generateContract);
router.get('/charter/:matchId', auth_middleware_1.authenticateToken, (0, auth_middleware_1.requireRole)(['ADMIN']), legal_controller_1.generateCharter);
router.post('/receipt/:matchId', auth_middleware_1.authenticateToken, (0, auth_middleware_1.requireRole)(['ADMIN']), legal_controller_1.generateReceipt);
router.post('/payment-notice/:matchId', auth_middleware_1.authenticateToken, (0, auth_middleware_1.requireRole)(['ADMIN']), legal_controller_1.generateNotice);
router.put('/setup-contract/:matchId', auth_middleware_1.authenticateToken, (0, auth_middleware_1.requireRole)(['ADMIN']), legal_controller_1.setupContract);
router.post('/send-documents/:matchId', auth_middleware_1.authenticateToken, (0, auth_middleware_1.requireRole)(['ADMIN']), legal_controller_1.sendDocuments);
exports.default = router;
//# sourceMappingURL=legal.routes.js.map