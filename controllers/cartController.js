const { validationResult } = require("express-validator");
const {
    getCarts,
    getCartById,
    getCartByCustomerId,
    insertCart,
    updateCart,
    deleteCart,
} = require("../services/cartService");

const getAllCartsController = async (req, res) => {
    try {
        const carts = await getCarts();
        res.status(200).json({ carts });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getCartByIdController = async (req, res) => {
    const { cart_ID } = req.body;
    if (!cart_ID){
        return res.status(400).json({ message: "Missing cart ID"});
    }
    try {
        const result = await getCartById(cart_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getCartByCustomerIdController = async (req, res) => {
    const { customer_ID } = req.body;
    if (!customer_ID){
        return res.status(400).json({ message: "Missing customer ID"});
    }
    try {
        const result = await getCartByCustomerId(customer_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const insertCartController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { customer_ID, product_ID, quantity } = req.body;

    try {
        const response = await insertCart(customer_ID, product_ID, quantity);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const updateCartController = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { cart_ID, customer_ID, product_ID, quantity } = req.body;

    try {
        const response = await updateCart({ cart_ID, customer_ID, product_ID, quantity });
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const deleteCartController = async (req, res) => {
    const { product_ID } = req.body;

    if (!product_ID) {
        return res.status(400).json({ message: "Missing Product ID" });
    }

    try {
        const result = await deleteCart(product_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

module.exports = {
    getAllCartsController,
    getCartByIdController,
    getCartByCustomerIdController,
    insertCartController,
    updateCartController,
    deleteCartController
};
