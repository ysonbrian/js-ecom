import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../util';
import Order from '../models/orderModel';

const orderRouter = express.Router();

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
      taxtPrice: req.body.taxtPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const createdOrder = await order.save();
    res
      .status(201)
      .send({ message: '새로운 주문이 추가되었습니다', order: createdOrder });
  })
);
export default orderRouter;
