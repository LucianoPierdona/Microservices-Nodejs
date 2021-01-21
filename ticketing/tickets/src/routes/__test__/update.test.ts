import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';
import request from 'supertest';
import { app } from '../../app';

it('returns a 404 if the provided id does not exist', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'wiaiwd',
      price: 20,
    })
    .expect(404);
});
it('returns a 401 if the user is not authenticated', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'wiaiwd',
      price: 20,
    })
    .expect(401);
});
it('returns a 401 if the user does not own the ticket', async () => {
  await request(app).post(`/api/tickets/`).set('Cookie', global.signin()).send({
    title: 'wiaiwd',
    price: 20,
  });

  const response = await Ticket.find({});

  await request(app)
    .put(`/api/tickets/${response[0].id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'awidoawio',
      price: 50,
    })
    .expect(401);
});
it('returns a 400 if the user provided a invalid title or price', async () => {});
it('updates the ticket provided valid inputs', async () => {});
