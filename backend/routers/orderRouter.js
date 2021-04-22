import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../util';
import Order from '../models/orderModel';

const orderRouter = express.Router();
orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: '주문한 물품을 찾을 수 없습니다.' });
    }
  })
);
orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const createdOrder = await order.save();
    res
      .status(201)
      .send({ message: '새로운 주문이 추가되었습니다', order: createdOrder });
  })
);

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.payment.paymentResult = {
        payerID: req.body.payerID,
        paymentID: req.body.paymentID,
        orderID: req.body.orderID,
      };
      const updatedOrder = await order.save();
      res.send({ message: '주문이 결제 되었습니다.', order: updatedOrder });
    } else {
      res.status(404).send({ message: '주문 상품을 확인 할 수 없습니다.' });
    }
  })
);
export default orderRouter;
