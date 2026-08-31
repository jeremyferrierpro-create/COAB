"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSignature = exports.updateUserAdmin = exports.createUserAdmin = exports.updateOnboarding = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.updateMe = exports.getMe = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const getMe = async (req, res, next) => {
    try {
        const authUser = req.user;
        const user = await prisma_1.default.user.findUnique({
            where: { id: authUser.id },
            include: {
                seniorProfile: { include: { matches: { include: { junior: { include: { user: true } } } } } },
                juniorProfile: { include: { matches: { include: { senior: { include: { user: true } } } } } },
                hthProfile: true,
                volunteerMatches: { include: { match: { include: { senior: { include: { user: true } }, junior: { include: { user: true } } } } } }
            }
        });
        if (!user) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }
        // TODO: masquer le mot de passe avant d'envoyer
        const { passwordHash, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
const updateMe = async (req, res, next) => {
    try {
        const authUser = req.user;
        const { firstName, lastName, phone, address, zipCode, city, seniorProfile, juniorProfile } = req.body;
        // Mise à jour de l'utilisateur de base
        const updateData = { firstName, lastName, phone, address, zipCode, city };
        await prisma_1.default.user.update({
            where: { id: authUser.id },
            data: updateData
        });
        // Mise à jour conditionnelle des profils (Sénior)
        if (authUser.role === 'SENIOR' && seniorProfile) {
            await prisma_1.default.seniorProfile.update({
                where: { userId: authUser.id },
                data: seniorProfile
            });
        }
        // Mise à jour conditionnelle des profils (Junior)
        if (authUser.role === 'JUNIOR' && juniorProfile) {
            await prisma_1.default.juniorProfile.update({
                where: { userId: authUser.id },
                data: juniorProfile
            });
        }
        res.json({ message: 'Profil mis à jour avec succès' });
    }
    catch (error) {
        next(error);
    }
};
exports.updateMe = updateMe;
const getAllUsers = async (req, res, next) => {
    try {
        const users = await prisma_1.default.user.findMany({
            include: {
                seniorProfile: true,
                juniorProfile: true,
                hthProfile: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(users);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await prisma_1.default.user.findUnique({
            where: { id },
            include: {
                seniorProfile: true,
                juniorProfile: true,
                hthProfile: true
            }
        });
        if (!user) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { firstName, lastName, role, isVerified } = req.body;
        // Simplification pour le MVP: on ne met à jour que les infos de base
        const user = await prisma_1.default.user.update({
            where: { id },
            data: { firstName, lastName, role, isVerified }
        });
        res.json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const authUser = req.user;
        // Droit à l'oubli : seul l'utilisateur lui-même ou un ADMIN peut supprimer le compte
        if (authUser.id !== id && authUser.role !== 'ADMIN') {
            res.status(403).json({ error: 'Accès refusé' });
            return;
        }
        await prisma_1.default.user.delete({ where: { id } });
        res.json({ message: 'Compte supprimé avec succès (Droit à l\'oubli RGPD appliqué)' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
const updateOnboarding = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        if (user.role === 'SENIOR') {
            await prisma_1.default.seniorProfile.upsert({
                where: { userId: id },
                update: { ...data, isProfileComplete: true },
                create: { userId: id, ...data, isProfileComplete: true, housingType: 'Unknown', roomSurface: 0, accessibilityLevel: 'Unknown' }
            });
        }
        else if (user.role === 'JUNIOR') {
            await prisma_1.default.juniorProfile.upsert({
                where: { userId: id },
                update: { ...data, isProfileComplete: true },
                create: { userId: id, ...data, isProfileComplete: true, situation: 'Unknown', maxBudget: 0, moveInDate: new Date() }
            });
        }
        res.json({ message: 'Onboarding terminé avec succès' });
    }
    catch (error) {
        next(error);
    }
};
exports.updateOnboarding = updateOnboarding;
const createUserAdmin = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, role, gender, birthDate, address, city, zipCode, housingType, roomSurface, hasPets, accessibilityLevel, situation, maxBudget, moveInDate, discoverySource, mutualInsurance, motivations, freeComments } = req.body;
        const finalEmail = email || `user_${Date.now()}@noemail.coab.fr`;
        const tempPassword = Math.random().toString(36).slice(-8);
        const passwordHash = await bcryptjs_1.default.hash(tempPassword, 10);
        const user = await prisma_1.default.user.create({
            data: {
                email: finalEmail,
                passwordHash,
                role,
                firstName,
                lastName,
                phone,
                gender,
                birthDate: birthDate ? new Date(birthDate) : null,
                address,
                city,
                zipCode,
                isVerified: true
            }
        });
        if (role === 'SENIOR') {
            await prisma_1.default.seniorProfile.create({
                data: {
                    userId: user.id,
                    isProfileComplete: true,
                    housingType: housingType || 'Non précisé',
                    roomSurface: Number(roomSurface) || 0,
                    hasPets: Boolean(hasPets),
                    accessibilityLevel: accessibilityLevel || 'Non précisé',
                    discoverySource,
                    mutualInsurance,
                    motivations,
                    freeComments
                }
            });
        }
        else if (role === 'JUNIOR') {
            await prisma_1.default.juniorProfile.create({
                data: {
                    userId: user.id,
                    isProfileComplete: true,
                    situation: situation || 'Non précisé',
                    maxBudget: Number(maxBudget) || 0,
                    moveInDate: moveInDate ? new Date(moveInDate) : new Date(),
                    discoverySource,
                    mutualInsurance,
                    motivations,
                    freeComments
                }
            });
        }
        // Si on avait un vrai email, on pourrait envoyer le mot de passe temporaire ici
        // via un service d'emailing (ex: SendGrid). Pour le mode hybride, on retourne le MDP.
        res.status(201).json({ user, tempPassword });
    }
    catch (error) {
        next(error);
    }
};
exports.createUserAdmin = createUserAdmin;
const updateUserAdmin = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { firstName, lastName, email, phone, gender, isVerified, birthDate, address, city, zipCode, housingType, roomSurface, hasPets, accessibilityLevel, situation, maxBudget, moveInDate, discoverySource, mutualInsurance, motivations, freeComments } = req.body;
        // Récupérer l'utilisateur pour connaître son rôle actuel
        const existingUser = await prisma_1.default.user.findUnique({ where: { id } });
        if (!existingUser) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }
        const user = await prisma_1.default.user.update({
            where: { id },
            data: {
                firstName,
                lastName,
                email,
                phone,
                gender,
                isVerified,
                birthDate: birthDate ? new Date(birthDate) : null,
                address,
                city,
                zipCode
            }
        });
        if (existingUser.role === 'SENIOR') {
            await prisma_1.default.seniorProfile.upsert({
                where: { userId: id },
                update: {
                    housingType,
                    roomSurface: Number(roomSurface) || 0,
                    hasPets: Boolean(hasPets),
                    accessibilityLevel,
                    discoverySource,
                    mutualInsurance,
                    motivations,
                    freeComments
                },
                create: {
                    userId: id,
                    isProfileComplete: true,
                    housingType: housingType || 'Non précisé',
                    roomSurface: Number(roomSurface) || 0,
                    hasPets: Boolean(hasPets),
                    accessibilityLevel: accessibilityLevel || 'Non précisé',
                    discoverySource,
                    mutualInsurance,
                    motivations,
                    freeComments
                }
            });
        }
        else if (existingUser.role === 'JUNIOR') {
            await prisma_1.default.juniorProfile.upsert({
                where: { userId: id },
                update: {
                    situation,
                    maxBudget: Number(maxBudget) || 0,
                    ...(moveInDate && { moveInDate: new Date(moveInDate) }),
                    hasPets: Boolean(hasPets),
                    discoverySource,
                    mutualInsurance,
                    motivations,
                    freeComments
                },
                create: {
                    userId: id,
                    isProfileComplete: true,
                    situation: situation || 'Non précisé',
                    maxBudget: Number(maxBudget) || 0,
                    moveInDate: moveInDate ? new Date(moveInDate) : new Date(),
                    hasPets: Boolean(hasPets),
                    discoverySource,
                    mutualInsurance,
                    motivations,
                    freeComments
                }
            });
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.updateUserAdmin = updateUserAdmin;
const saveSignature = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const { signature } = req.body;
        if (!userId) {
            res.status(401).json({ error: 'Non authentifié' });
            return;
        }
        if (!signature) {
            res.status(400).json({ error: 'Signature requise' });
            return;
        }
        await prisma_1.default.user.update({
            where: { id: userId },
            data: { signatureBase64: signature }
        });
        res.json({ success: true, message: 'Signature sauvegardée' });
    }
    catch (error) {
        next(error);
    }
};
exports.saveSignature = saveSignature;
//# sourceMappingURL=user.controller.js.map