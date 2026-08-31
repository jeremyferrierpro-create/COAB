"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const volunteer_controller_1 = require("../controllers/volunteer.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Routes protégées par l'authentification
router.use(auth_middleware_1.authenticateToken);
// Récupérer les rapports (filtrés par le bénévole, ou tous pour l'admin)
router.get('/reports', volunteer_controller_1.getVolunteerReports);
// Créer un nouveau rapport de suivi
router.post('/report', volunteer_controller_1.createVolunteerReport);
exports.default = router;
//# sourceMappingURL=volunteer.routes.js.map