import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { serverConfig } from '../config';

export default function (req: Request, res: Response, next: NextFunction) {
  let rawToken = req.headers.cookie;

  // filter prefix(cookie name)
  if (!rawToken)
    return res.status(401).send('Access denied. No token provided.');
  rawToken = rawToken.substring('session='.length);

  // extract server's token from client's token
  const decodeToken = jwt.decode(rawToken);
  //@ts-ignore
  const userToken = decodeToken.payload.token;

  const { JWT_SECRET } = serverConfig;

  try {
    const decoded = jwt.verify(userToken, JWT_SECRET);

    // @ts-ignore
    req.user = decoded;
    
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
}
