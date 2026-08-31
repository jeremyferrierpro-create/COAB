import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { logger } from './lib/logger';
import { errorHandler } from './middleware/errorHandler.middleware';
import authRoutes from './routes/auth.routes';
import matchingRoutes from './routes/matching.routes';
import legalRoutes from './routes/legal.routes';
import userRoutes from './routes/user.routes';
import volunteerRoutes from './routes/volunteer.routes';
import documentRoutes from './routes/document.routes';
import paymentRoutes from './routes/payment.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(helmet({
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

app.use(cors({ 
  origin: [FRONTEND_URL, /^http:\/\/localhost:\d+$/],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); 

// Augmentation de la limite pour permettre l'upload de fichiers en Base64
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/legal', legalRoutes);
app.use('/api/users', userRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/payments', paymentRoutes);

// Route par défaut
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API COAB' });
});

// Gestionnaire d'erreurs global (doit être le dernier middleware)
app.use(errorHandler);

// Démarrage
app.listen(PORT, () => {
  logger.info(`Serveur démarré sur http://localhost:${PORT}`);
});
