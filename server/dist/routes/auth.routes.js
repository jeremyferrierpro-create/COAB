"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post('/login', auth_controller_1.login);
router.post('/register', auth_controller_1.register);
router.post('/register-senior', auth_controller_1.registerSenior);
router.post('/register-junior', auth_controller_1.registerJunior);
router.post('/seed', auth_controller_1.seedDevUsers); // Endpoint de dev
// Exemple de route protégée (pour valider le token au chargement frontend)
router.get('/me', auth_middleware_1.authenticateToken, (req, res) => {
    res.json({ user: req.user });
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map