const express = require('express');
const {
    getAllOrdersController,
    getOrderByIdController,
    insertOrderController,
    deleteOrderController,
} = require('../controllers/orderController');

const {
    insertOrderValidation,
} = require('../validations/orderValidator');


const router = express.Router();

router.get('/orders', getAllOrdersController);
router.post('/order', getOrderByIdController);
router.post('/newOrder', insertOrderValidation, insertOrderController);
router.delete('/order', deleteOrderController);

module.exports = router;