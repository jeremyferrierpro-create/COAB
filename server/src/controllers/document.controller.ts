import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { DocumentType } from '@prisma/client';

export const uploadDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { docType, fileData, matchId } = req.body;
    const userId = (req as any).user.id;

    if (!docType || !fileData) {
      res.status(400).json({ error: 'Type de document et données du fichier requis.' });
      return;
    }

    // On s'assure que le type de document est valide
    if (!Object.values(DocumentType).includes(docType)) {
      res.status(400).json({ error: 'Type de document invalide.' });
      return;
    }

    const document = await prisma.document.create({
      data: {
        userId,
        matchId: matchId || null,
        docType: docType as DocumentType,
        fileUrl: `/api/documents/download/`, // L'ID sera ajouté plus tard
        fileData
      }
    });

    // On met à jour l'URL avec l'ID du document pour faciliter le téléchargement
    const updatedDocument = await prisma.document.update({
      where: { id: document.id },
      data: { fileUrl: `/api/documents/${document.id}/download` }
    });

    // Ne pas renvoyer le fileData car trop lourd
    const { fileData: _, ...safeDocument } = updatedDocument;
    res.status(201).json(safeDocument);
  } catch (error) {
    next(error);
  }
};

export const downloadDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    const userRole = (req as any).user.role;
    const userId = (req as any).user.id;

    const document = await prisma.document.findUnique({
      where: { id },
      include: { match: true }
    }) as any;

    if (!document) {
      res.status(404).json({ error: 'Document non trouvé' });
      return;
    }

    // Vérification des droits d'accès
    const isOwner = document.userId === userId;
    const isAdmin = userRole === 'ADMIN';
    const isMatchedUser = document.match?.seniorId === userId || document.match?.juniorId === userId;

    if (!isOwner && !isAdmin && !isMatchedUser) {
      res.status(403).json({ error: 'Accès non autorisé' });
      return;
    }

    if (!document.fileData) {
      res.status(404).json({ error: 'Fichier non trouvé en base' });
      return;
    }

    // Le fileData est censé être en Base64 (ex: data:application/pdf;base64,JVBERi0xLjQK...)
    // Extraire le mime-type et les données
    const fileDataStr = document.fileData as string;
    const matches = fileDataStr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      res.status(400).json({ error: 'Format de fichier invalide' });
      return;
    }

    const mimeType = matches[1];
    const buffer = Buffer.from(matches[2] || '', 'base64');

    // Définir les headers
    const mimeTypeStr = mimeType || 'application/octet-stream';
    let extension = 'bin';
    if (mimeTypeStr.includes('pdf')) extension = 'pdf';
    else if (mimeTypeStr.includes('png')) extension = 'png';
    else if (mimeTypeStr.includes('jpeg')) extension = 'jpg';

    res.setHeader('Content-Type', mimeTypeStr);
    res.setHeader('Content-Disposition', `attachment; filename="document_${id}.${extension}"`);
    res.send(buffer);
  } catch (error) {
    next(error);
  }
};

export const getUserDocuments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const documents = await prisma.document.findMany({
      where: { userId },
      orderBy: { id: 'desc' },
      select: {
        id: true,
        docType: true,
        fileUrl: true,
        matchId: true,
        signedAt: true,
        // Ne pas inclure fileData pour ne pas alourdir la requête
      }
    });
    res.json(documents);
  } catch (error) {
    next(error);
  }
};
