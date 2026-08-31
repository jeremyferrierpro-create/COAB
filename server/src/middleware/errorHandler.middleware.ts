import { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);
  
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({
      error: 'Une erreur interne est survenue. Notre équipe a été alertée.'
    });
  } else {
    res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
};
