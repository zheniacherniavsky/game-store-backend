import { Request, Response } from 'express';

const routeNotFound = (req: Request, res: Response): void => {
  res.status(404);
  res.json({ error: 'Not found!' });
};

export default routeNotFound;
