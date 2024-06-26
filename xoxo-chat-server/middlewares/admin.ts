import { NextFunction, Request, Response } from 'express';

export default function(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  if (!req.user.isAdmin) return res.status(403).send('Access denied.');

  next();
}
