const { validationResult } = require("express-validator");
const { 
    getShipments,
    getShipmentById,
    getShipmentsByCustomerId,
    insertShipment,
    deleteShipment,
} = require("../services/shipmentService");

const getShipmentsController = async (req, res) => {
    try {
        const shipments = await getShipments();
        res.status(200).json({ shipments });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getShipmentByIdController = async (req, res) => {
    const { shipment_ID } = req.body;
    if (!shipment_ID){
        return res.status(400).json({ message: "Missing shipment ID"});
    }
    try {
        const result = await getShipmentById(shipment_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getShipmentsByCustomerIdController = async (req, res) => {
    const { customer_ID } = req.body;
    if (!customer_ID){
        return res.status(400).json({ message: "Missing customer ID"});
    }
    try {
        const result = await getShipmentsByCustomerId(customer_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const insertShipmentController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { order_ID, customer_ID } = req.body;

    try {
        const response = await insertShipment(order_ID, customer_ID);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const deleteShipmentController = async (req, res) => {
    const { shipment_ID } = req.body;

    if (!shipment_ID) {
        return res.status(400).json({ message: "Missing shipment ID" });
    }

    try {
        const result = await deleteShipment(shipment_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

module.exports = {
    getShipmentsController,
    getShipmentByIdController,
    getShipmentsByCustomerIdController,
    insertShipmentController,
    deleteShipmentController,
};