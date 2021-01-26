import { OrderStatus } from '@lpjtickets/common';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { Order } from '../../models/order';

it('successfully cancel the order', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
  });

  await ticket.save();
  const user = global.signin();

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set(`Cookie`, user)
    .send()
    .expect(204);

  const cancelledOrder = await Order.find({});

  expect(cancelledOrder[0].status).toEqual(OrderStatus.Cancelled);
});
