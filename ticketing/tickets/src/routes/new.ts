import { requireAuth } from '@lpjtickets/common';
import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/tickets', requireAuth, (req: Request, res: Response) => {
  return res.sendStatus(200);
});

export { router as createTicketRouter };
