const { validationResult } = require("express-validator");
const {
    getCustomize,
    getCustomizeById,
    getCustomizeByProductId,
    insertCustomize,
    updateCustomize,
    deleteCustomize,
} = require("../services/customizeService");

const getAllCustomizeController = async (req, res) => {
    try {
        const customize = await getCustomize();
        res.status(200).json({ customize });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getCustomizeByIdController = async (req, res) => {
    const { customization_ID } = req.body;

    if(!customization_ID){
        return res.status(400).json({ message: "missing customize id" });
    }
    try{
        const result = await getCustomizeById(customization_ID);
        res.status(200).json({ result });
    } catch(error) {
        res.status(500).json({ message: error?.message });
    }
}

const getCustomizeByProductController = async (req, res) => {
    const { product_ID } = req.body;

    if(!product_ID){
        return res.status(400).json({ message: "missing product id" });
    }
    try{
        const result = await getCustomizeByProductId(product_ID);
        res.status(200).json({ result });
    } catch(error) {
        res.status(500).json({ message: error?.message });
    }
}

const insertCustomizeController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { customization_Size, customization_Color, product_ID } = req.body;

    try {
        const response = await insertCustomize(customization_Size, customization_Color, product_ID);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const updateCustomizeController = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {product_ID, customization_Size, customization_Color } = req.body;

    try {
        const response = await updateCustomize({ product_ID, customization_Size, customization_Color });
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const deleteCustomizeController = async (req, res) => {
    const { customization_ID } = req.body;

    if (!customization_ID) {
        return res.status(400).json({ message: "missing customize ID" });
    }

    try {
        const result = await deleteCustomize(customization_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

module.exports = {
    getAllCustomizeController,
    getCustomizeByIdController,
    getCustomizeByProductController,
    insertCustomizeController,
    updateCustomizeController,
    deleteCustomizeController,
};
