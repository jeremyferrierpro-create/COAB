import { Request, Response, NextFunction } from 'express';
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const registerSenior: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const registerJunior: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const seedDevUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map