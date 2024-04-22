const { validationResult } = require("express-validator");
const { 
    getReviews,
    getReviewsById,
    getReviewsByProductId,
    getRatingByProductId,
    insertReviews,
    deleteReviews,
} = require("../services/reviewService");

const getReviewsController = async (req, res) => {
    try {
        const reviews = await getReviews();
        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getReviewsByIdController = async (req, res) => {
    const { review_ID } = req.body;
    if (!review_ID){
        return res.status(400).json({ message: "Missing reviews ID"});
    }
    try {
        const result = await getReviewsById(address_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getReviewsByProductIdController = async (req, res) => {
    const { product_ID } = req.body;
    if (!product_ID){
        return res.status(400).json({ message: "Missing product ID"});
    }
    try {
        const result = await getReviewsByProductId(product_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getRatingByProductIdController = async (req, res) => {
    const { product_ID } = req.body;
    if (!product_ID){
        return res.status(400).json({ message: "Missing product ID"});
    }
    try {
        const result = await getRatingByProductId(product_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const insertReviewsController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { customer_ID, product_ID, rating, review_Text } = req.body;

    try {
        const response = await insertReviews(customer_ID, product_ID, rating, review_Text);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const deleteReviewsController = async (req, res) => {
    const { review_ID } = req.body;

    if (!review_ID) {
        return res.status(400).json({ message: "Missing reviews ID" });
    }

    try {
        const result = await deleteReviews(review_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

module.exports = {
    getReviewsController,
    getReviewsByIdController,
    getReviewsByProductIdController,
    getRatingByProductIdController,
    insertReviewsController,
    deleteReviewsController,
};