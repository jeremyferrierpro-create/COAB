import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-coab-123';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, role, firstName, lastName } = req.body;

    if (!email || !password || !role) {
      res.status(400).json({ error: 'Champs obligatoires manquants.' });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'Cet email est déjà utilisé.' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role,
        firstName,
        lastName,
        isVerified: false
      }
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Inscription réussie',
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
    next(error);
  }
};

export const registerSenior = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { 
      email, password, firstName, lastName, phone, birthDate, birthPlace, nationality, address, zipCode, city,
      housingType, roomSurface, hasPets, accessibilityLevel, expectedPresence, preferredProfile, acceptCharte, sleepHabit, presencePattern
    } = req.body;

    if (!email || !password || !firstName || !lastName) {
      res.status(400).json({ error: 'Champs de base manquants.' });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'Cet email est déjà utilisé.' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: 'SENIOR',
        firstName,
        lastName,
        phone,
        birthDate: birthDate ? new Date(birthDate) : null,
        birthPlace,
        nationality,
        address,
        zipCode,
        city,
        isVerified: false,
        seniorProfile: {
          create: {
            housingType: housingType || 'Appartement',
            roomSurface: Number(roomSurface) || 9,
            hasPets: Boolean(hasPets),
            accessibilityLevel: accessibilityLevel || 'Plain-pied',
            sleepHabit: sleepHabit || 'VARIABLE',
            presencePattern: presencePattern || 'MEDIUM',
            isProfileComplete: true
          }
        }
      }
    });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ message: 'Inscription Sénior réussie', token, user });
  } catch (error) {
    next(error);
  }
};

export const registerJunior = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { 
      email, password, firstName, lastName, phone, birthDate, birthPlace, nationality, address, zipCode, city,
      situation, targetCities, maxBudget, moveInDate, hobbies, sleepHabit, acceptCharte
    } = req.body;

    if (!email || !password || !firstName || !lastName) {
      res.status(400).json({ error: 'Champs de base manquants.' });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'Cet email est déjà utilisé.' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: 'JUNIOR',
        firstName,
        lastName,
        phone,
        birthDate: birthDate ? new Date(birthDate) : null,
        birthPlace,
        nationality,
        address,
        zipCode,
        city,
        isVerified: false,
        juniorProfile: {
          create: {
            situation: situation || 'Etudiant',
            targetCities: targetCities || [],
            maxBudget: Number(maxBudget) || 0,
            moveInDate: moveInDate ? new Date(moveInDate) : new Date(),
            hobbies: hobbies || [],
            sleepHabit: sleepHabit || 'VARIABLE',
            isProfileComplete: true
          }
        }
      }
    });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ message: 'Inscription Junior réussie', token, user });
  } catch (error) {
    next(error);
  }
};

export const seedDevUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
    next(error);
  }
};
