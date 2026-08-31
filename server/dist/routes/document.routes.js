"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const document_controller_1 = require("../controllers/document.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Routes protégées par authentification
router.use(auth_middleware_1.authenticateToken);
// Uploader un nouveau document
router.post('/upload', document_controller_1.uploadDocument);
// Liste des documents de l'utilisateur
router.get('/me', document_controller_1.getUserDocuments);
// Télécharger/Voir un document
router.get('/:id/download', document_controller_1.downloadDocument);
exports.default = router;
//# sourceMappingURL=document.routes.js.map