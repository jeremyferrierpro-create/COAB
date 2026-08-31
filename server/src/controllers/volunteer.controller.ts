import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

// Récupérer les rapports d'un bénévole (ou tous si l'utilisateur est admin)
export const getVolunteerReports = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userRole = (req as any).user.role;
    const userId = (req as any).user.id;

    let whereClause = {};
    if (userRole === 'VOLUNTEER') {
      whereClause = { volunteerId: userId };
    } else if (userRole !== 'ADMIN') {
      res.status(403).json({ error: 'Accès non autorisé' });
      return;
    }

    const reports = await prisma.monthlyFollowup.findMany({
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
  } catch (error) {
    next(error);
  }
};

// Créer ou mettre à jour un rapport
export const createVolunteerReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { 
      id, matchId, interviewDate, seniorFeedback, juniorFeedback, generalNotes,
      qualityRating, incidentsReported, incidentDetails, nextActionSteps
    } = req.body;
    
    const volunteerId = (req as any).user.id;
    const userRole = (req as any).user.role;

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
      report = await prisma.monthlyFollowup.update({
        where: { id },
        data
      });
    } else {
      report = await prisma.monthlyFollowup.create({
        data
      });
    }

    res.status(201).json(report);
  } catch (error) {
    next(error);
  }
};
