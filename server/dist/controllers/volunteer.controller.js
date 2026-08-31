"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVolunteerReport = exports.getVolunteerReports = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
// Récupérer les rapports d'un bénévole (ou tous si l'utilisateur est admin)
const getVolunteerReports = async (req, res, next) => {
    try {
        const userRole = req.user.role;
        const userId = req.user.id;
        let whereClause = {};
        if (userRole === 'VOLUNTEER') {
            whereClause = { volunteerId: userId };
        }
        else if (userRole !== 'ADMIN') {
            res.status(403).json({ error: 'Accès non autorisé' });
            return;
        }
        const reports = await prisma_1.default.monthlyFollowup.findMany({
            where: whereClause,
            include: {
                match: {
                    include: {
                        senior: { include: { user: true } },
                        junior: { include: { user: true } }
                    }
                },
                volunteer: true
            },
            orderBy: { interviewDate: 'desc' }
        });
        res.json(reports);
    }
    catch (error) {
        next(error);
    }
};
exports.getVolunteerReports = getVolunteerReports;
// Créer ou mettre à jour un rapport
const createVolunteerReport = async (req, res, next) => {
    try {
        const { id, matchId, interviewDate, seniorFeedback, juniorFeedback, generalNotes, qualityRating, incidentsReported, incidentDetails, nextActionSteps } = req.body;
        const volunteerId = req.user.id;
        const userRole = req.user.role;
        if (userRole !== 'VOLUNTEER' && userRole !== 'ADMIN') {
            res.status(403).json({ error: 'Accès non autorisé' });
            return;
        }
        const data = {
            matchId,
            volunteerId,
            interviewDate: new Date(interviewDate),
            seniorFeedback,
            juniorFeedback,
            generalNotes,
            qualityRating: qualityRating ? parseInt(qualityRating, 10) : null,
            incidentsReported: Boolean(incidentsReported),
            incidentDetails,
            nextActionSteps
        };
        let report;
        if (id) {
            report = await prisma_1.default.monthlyFollowup.update({
                where: { id },
                data
            });
        }
        else {
            report = await prisma_1.default.monthlyFollowup.create({
                data
            });
        }
        res.status(201).json(report);
    }
    catch (error) {
        next(error);
    }
};
exports.createVolunteerReport = createVolunteerReport;
//# sourceMappingURL=volunteer.controller.js.map