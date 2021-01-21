import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';

it('returns a 404 if the ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it('return the ticket if the ticket is found', async () => {
  const title = 'concert';
  const price = 20;
  await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
    title,
    price,
  });

  const tickets = await Ticket.find({});

  const ticketReponse = await request(app)
    .get(`/api/tickets/${tickets[0].id}`)
    .expect(200);

  expect(ticketReponse.body).toEqual({
    title,
    price,
  });
});
