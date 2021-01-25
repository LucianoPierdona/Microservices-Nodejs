import express, { Request, Response } from 'express';

const router = express.Router();

router.delete(`/api/orders/:orderId`, async (req: Request, res: Response) => {
  const { orderId } = req.params;
  return res.send({});
});

export { router as deleteOrdersRouter };
