const express = require('express');
const {
    getShipmentsController,
    getShipmentByIdController,
    getShipmentsByCustomerIdController,
    insertShipmentController,
    deleteShipmentController,
} = require('../controllers/shipmentController');

const {
    insertShipmentValidation,
} = require('../validations/shipmentValidator');

const router = express.Router();

router.get('/shipments', getShipmentsController);
router.post('/shipment', getShipmentByIdController);
router.post('/shipmentForCustomer', getShipmentsByCustomerIdController);
router.post('/newShipment', insertShipmentValidation, insertShipmentController);
router.delete('/shipment', deleteShipmentController);

module.exports = router;