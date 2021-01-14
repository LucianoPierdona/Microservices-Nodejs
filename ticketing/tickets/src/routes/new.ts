import { requireAuth, validateRequest } from '@lpjtickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [body('title').not().isEmpty().withMessage('Title is required')],
  validateRequest,
  (req: Request, res: Response) => {
    return res.sendStatus(200);
  }
);

export { router as createTicketRouter };
