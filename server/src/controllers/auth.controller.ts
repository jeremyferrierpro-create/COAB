import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-coab-123';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email et mot de passe requis.' });
      return;
    }

    // Recherche de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Pour le développement, on peut injecter un mock temporaire si la BDD est vide
      // mais en prod on renvoie 401
      res.status(401).json({ error: 'Identifiants incorrects.' });
      return;
    }

    // Vérification du mot de passe
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Identifiants incorrects.' });
      return;
    }

    // Génération du JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Erreur lors du login:', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

// Fonction utilitaire pour le développement : Créer des utilisateurs de test
export const seedDevUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const passwordHash = await bcrypt.hash('password123', 10);
    
    // Création d'un Admin
    await prisma.user.upsert({
      where: { email: 'admin@coab.fr' },
      update: {},
      create: {
        email: 'admin@coab.fr',
        passwordHash,
        role: 'ADMIN',
        firstName: 'Jean',
        lastName: 'Admin',
        isVerified: true
      }
    });

    // Création d'un Sénior
    await prisma.user.upsert({
      where: { email: 'senior@coab.fr' },
      update: {},
      create: {
        email: 'senior@coab.fr',
        passwordHash,
        role: 'SENIOR',
        firstName: 'Michel',
        lastName: 'Dupont',
        isVerified: true
      }
    });

    // Création d'un Junior
    await prisma.user.upsert({
      where: { email: 'junior@coab.fr' },
      update: {},
      create: {
        email: 'junior@coab.fr',
        passwordHash,
        role: 'JUNIOR',
        firstName: 'Alice',
        lastName: 'Martin',
        isVerified: true
      }
    });

    res.json({ message: 'Utilisateurs de test générés (admin@coab.fr, senior@coab.fr, junior@coab.fr / password123)' });
  } catch (error) {
    console.error('Erreur seed users:', error);
    res.status(500).json({ error: 'Erreur interne' });
  }
};
