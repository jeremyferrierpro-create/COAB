"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matching_controller_1 = require("../controllers/matching.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Routes protégées par l'authentification
// L'accès Admin pourrait être requis, ou l'utilisateur lui-même
router.get('/senior/:seniorId', auth_middleware_1.authenticateToken, matching_controller_1.getMatchesForSenior);
router.get('/junior/:juniorId', auth_middleware_1.authenticateToken, matching_controller_1.getMatchesForJunior);
router.post('/create', auth_middleware_1.authenticateToken, (0, auth_middleware_1.requireRole)(['ADMIN']), matching_controller_1.createMatch);
exports.default = router;
//# sourceMappingURL=matching.routes.js.map