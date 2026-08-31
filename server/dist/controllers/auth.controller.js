"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDevUsers = exports.registerJunior = exports.registerSenior = exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-coab-123';
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email et mot de passe requis.' });
            return;
        }
        // Recherche de l'utilisateur
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            // Pour le développement, on peut injecter un mock temporaire si la BDD est vide
            // mais en prod on renvoie 401
            res.status(401).json({ error: 'Identifiants incorrects.' });
            return;
        }
        // Vérification du mot de passe
        const isValidPassword = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isValidPassword) {
            res.status(401).json({ error: 'Identifiants incorrects.' });
            return;
        }
        // Génération du JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
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
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const register = async (req, res, next) => {
    try {
        const { email, password, role, firstName, lastName } = req.body;
        if (!email || !password || !role) {
            res.status(400).json({ error: 'Champs obligatoires manquants.' });
            return;
        }
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'Cet email est déjà utilisé.' });
            return;
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                email,
                passwordHash,
                role,
                firstName,
                lastName,
                isVerified: false
            }
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
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
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const registerSenior = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, phone, birthDate, birthPlace, nationality, address, zipCode, city, housingType, roomSurface, hasPets, accessibilityLevel, expectedPresence, preferredProfile, acceptCharte, sleepHabit, presencePattern } = req.body;
        if (!email || !password || !firstName || !lastName) {
            res.status(400).json({ error: 'Champs de base manquants.' });
            return;
        }
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'Cet email est déjà utilisé.' });
            return;
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
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
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: 'Inscription Sénior réussie', token, user });
    }
    catch (error) {
        next(error);
    }
};
exports.registerSenior = registerSenior;
const registerJunior = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, phone, birthDate, birthPlace, nationality, address, zipCode, city, situation, targetCities, maxBudget, moveInDate, hobbies, sleepHabit, acceptCharte } = req.body;
        if (!email || !password || !firstName || !lastName) {
            res.status(400).json({ error: 'Champs de base manquants.' });
            return;
        }
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'Cet email est déjà utilisé.' });
            return;
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
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
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: 'Inscription Junior réussie', token, user });
    }
    catch (error) {
        next(error);
    }
};
exports.registerJunior = registerJunior;
const seedDevUsers = async (req, res, next) => {
    try {
        const passwordHash = await bcryptjs_1.default.hash('password123', 10);
        // Création d'un Admin
        await prisma_1.default.user.upsert({
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
        await prisma_1.default.user.upsert({
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
        await prisma_1.default.user.upsert({
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
    }
    catch (error) {
        next(error);
    }
};
exports.seedDevUsers = seedDevUsers;
//# sourceMappingURL=auth.controller.js.map