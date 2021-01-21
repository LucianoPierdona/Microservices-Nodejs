import { NotFoundError } from '@lpjtickets/common';
import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  return res.send({
    title: ticket.title,
    price: ticket.price,
  });
});

export { router as showTicketRouter };
