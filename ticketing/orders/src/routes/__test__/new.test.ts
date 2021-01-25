import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('return an error if the user does not exist', async () => {
  const ticketId = mongoose.Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({
      ticketId,
    })
    .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {});

it('successfully reserves a ticket', async () => {});
