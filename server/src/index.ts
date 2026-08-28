import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' })); // Accepte les requêtes du front-end Vite
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Route par défaut
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API COAB' });
});

// Démarrage
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
