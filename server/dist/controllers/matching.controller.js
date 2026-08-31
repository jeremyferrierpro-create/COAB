"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMatch = exports.getMatchesForJunior = exports.getMatchesForSenior = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const client_1 = require("@prisma/client");
const getMatchesForSenior = async (req, res) => {
    try {
        const seniorId = req.params.seniorId;
        const senior = await prisma_1.default.seniorProfile.findUnique({
            where: { id: seniorId },
            include: { user: true }
        });
        if (!senior) {
            res.status(404).json({ error: 'Sénior non trouvé' });
            return;
        }
        const juniors = await prisma_1.default.juniorProfile.findMany({
            where: { isProfileComplete: true },
            include: { user: true }
        });
        const suggestions = juniors.map(junior => {
            const { score, reasons } = calculateMatchScore(senior, junior);
            return {
                junior,
                score,
                reasons
            };
        }).sort((a, b) => b.score - a.score); // Trier par score décroissant
        res.json({ senior, suggestions });
    }
    catch (error) {
        console.error('Erreur getMatchesForSenior:', error);
        res.status(500).json({ error: 'Erreur interne' });
    }
};
exports.getMatchesForSenior = getMatchesForSenior;
const getMatchesForJunior = async (req, res) => {
    try {
        const juniorId = req.params.juniorId;
        const junior = await prisma_1.default.juniorProfile.findUnique({
            where: { id: juniorId },
            include: { user: true }
        });
        if (!junior) {
            res.status(404).json({ error: 'Junior non trouvé' });
            return;
        }
        const seniors = await prisma_1.default.seniorProfile.findMany({
            where: { isProfileComplete: true },
            include: { user: true }
        });
        const suggestions = seniors.map(senior => {
            const { score, reasons } = calculateMatchScore(senior, junior);
            return {
                senior,
                score,
                reasons
            };
        }).sort((a, b) => b.score - a.score);
        res.json({ junior, suggestions });
    }
    catch (error) {
        console.error('Erreur getMatchesForJunior:', error);
        res.status(500).json({ error: 'Erreur interne' });
    }
};
exports.getMatchesForJunior = getMatchesForJunior;
/**
 * Algorithme de Matching COAB Ultra-Spécialisé
 * Retourne un score sur 100 et un tableau de raisons (positives/négatives)
 */
function calculateMatchScore(senior, junior) {
    let score = 50; // Base médiane
    const reasons = [];
    // =====================================
    // 1. FILTRES ÉLIMINATOIRES (Hard match)
    // =====================================
    // Fumeur
    if (junior.isSmoker && senior.smokerTolerance === 'STRICTLY_NO') {
        return { score: 0, reasons: ['Éliminatoire : Refus strict du tabac'] };
    }
    // =====================================
    // 2. AFFINITÉS DE VIE (Soft match)
    // =====================================
    // Rythme de Sommeil
    if (senior.sleepHabit && junior.sleepHabit) {
        if (senior.sleepHabit === junior.sleepHabit) {
            score += 15;
            reasons.push('Excellent : Même rythme de sommeil');
        }
        else if ((senior.sleepHabit === 'EARLY_BIRD' && junior.sleepHabit === 'NIGHT_OWL') ||
            (senior.sleepHabit === 'NIGHT_OWL' && junior.sleepHabit === 'EARLY_BIRD')) {
            score -= 15;
            reasons.push('Attention : Rythmes de sommeil opposés');
        }
    }
    // Besoin Social
    if (senior.socialNeed && junior.socialNeed) {
        if (senior.socialNeed === junior.socialNeed) {
            score += 15;
            reasons.push('Excellent : Même vision de la vie sociale');
        }
        else if ((senior.socialNeed === 'INDEPENDENT' && junior.socialNeed === 'HIGHLY_SOCIAL') ||
            (senior.socialNeed === 'HIGHLY_SOCIAL' && junior.socialNeed === 'INDEPENDENT')) {
            score -= 15;
            reasons.push('Attention : Besoins sociaux très différents');
        }
    }
    // Tolérance au Bruit
    if (senior.noiseTolerance && junior.noiseTolerance) {
        if (senior.noiseTolerance === 'LOW' && junior.noiseTolerance === 'HIGH') {
            score -= 10;
            reasons.push('Risque de conflit : Écart de tolérance au bruit');
        }
        else if (senior.noiseTolerance === junior.noiseTolerance) {
            score += 10;
        }
    }
    // =====================================
    // 3. CONTRAT SOLIDAIRE (Services)
    // =====================================
    // Comparaison des services requis par le senior vs offerts par le junior
    const reqServices = senior.requiredServices || [];
    const offServices = junior.offeredServices || [];
    let servicesMatchCount = 0;
    reqServices.forEach(reqS => {
        if (offServices.includes(reqS)) {
            servicesMatchCount++;
            score += 10; // Bonus pour chaque service rendu
        }
    });
    if (reqServices.length > 0) {
        if (servicesMatchCount === reqServices.length) {
            reasons.push('Idéal : Le junior offre TOUS les services demandés');
            score += 10; // Extra bonus
        }
        else if (servicesMatchCount > 0) {
            reasons.push(`Correspondance partielle : Offre ${servicesMatchCount}/${reqServices.length} services demandés`);
        }
        else {
            reasons.push('Aucune correspondance sur les services demandés');
            score -= 20; // Malus fort si le contrat solidaire n'est pas rempli
        }
    }
    // Normalisation du score entre 0 et 100
    if (score > 100)
        score = 100;
    if (score < 10)
        score = 10; // Un minimum pour ne pas froisser, sauf si éliminatoire
    return { score, reasons };
}
const createMatch = async (req, res) => {
    try {
        const { seniorId, juniorId, housingFormula, score } = req.body;
        if (!seniorId || !juniorId || !housingFormula) {
            res.status(400).json({ error: 'Données manquantes' });
            return;
        }
        const senior = await prisma_1.default.seniorProfile.findUnique({ where: { id: seniorId } });
        const junior = await prisma_1.default.juniorProfile.findUnique({ where: { id: juniorId } });
        if (!senior || !junior) {
            res.status(404).json({ error: 'Profil Sénior ou Junior introuvable' });
            return;
        }
        const newMatch = await prisma_1.default.match.create({
            data: {
                seniorId,
                juniorId,
                housingFormula: housingFormula,
                score,
                status: client_1.MatchStatus.SUGGESTED
            }
        });
        res.status(201).json(newMatch);
    }
    catch (error) {
        console.error('Erreur createMatch:', error);
        res.status(500).json({ error: 'Erreur interne' });
    }
};
exports.createMatch = createMatch;
//# sourceMappingURL=matching.controller.js.map