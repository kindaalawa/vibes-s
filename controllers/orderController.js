const { validationResult } = require("express-validator");
const {
  getOrders,
  getOrderById,
  insertOrder,
  deleteOrder
} = require('../services/orderService');

const getAllOrdersController = async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getOrderByIdController = async (req, res) => {
  const { order_ID } = req.body;

  if(!order_ID){
    return res.status(400).json({ message: "Missing order id" });
  }
  try {
      const result = await getOrderById(order_ID);
      res.status(200).json({ result });
  } catch(error) {
    res.status(500).json({ message: error?.message });
  }
}

const insertOrderController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { cart_ID } = req.body;

  try {
      const response = await insertOrder(cart_ID);
      res.status(201).json({ response });
  } catch (error) {
      res.status(500).json({ error: error?.message });
  }
}

const deleteOrderController = async (req, res) => {
  const { order_ID } = req.body;

  if (!order_ID) {
      return res.status(400).json({ message: "Missing order ID" });
  }

  try {
      const result = await deleteOrder(order_ID);
      res.status(200).json({ result });
  } catch (error) {
      res.status(500).json({ message: error?.message });
  }
}

module.exports = {
  getAllOrdersController,
  getOrderByIdController,
  insertOrderController,
  deleteOrderController,
};
