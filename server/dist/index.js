"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("./lib/logger");
const errorHandler_middleware_1 = require("./middleware/errorHandler.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const matching_routes_1 = __importDefault(require("./routes/matching.routes"));
const legal_routes_1 = __importDefault(require("./routes/legal.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const volunteer_routes_1 = __importDefault(require("./routes/volunteer.routes"));
const document_routes_1 = __importDefault(require("./routes/document.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
// Middleware
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", FRONTEND_URL, "http://localhost:*"],
        },
    },
}));
app.use((0, cors_1.default)({
    origin: [FRONTEND_URL, /^http:\/\/localhost:\d+$/],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Augmentation de la limite pour permettre l'upload de fichiers en Base64
app.use(express_1.default.json({ limit: '20mb' }));
app.use(express_1.default.urlencoded({ limit: '20mb', extended: true }));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/matching', matching_routes_1.default);
app.use('/api/legal', legal_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/volunteers', volunteer_routes_1.default);
app.use('/api/documents', document_routes_1.default);
app.use('/api/payments', payment_routes_1.default);
// Route par défaut
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API COAB' });
});
// Gestionnaire d'erreurs global (doit être le dernier middleware)
app.use(errorHandler_middleware_1.errorHandler);
// Démarrage
app.listen(PORT, () => {
    logger_1.logger.info(`Serveur démarré sur http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map