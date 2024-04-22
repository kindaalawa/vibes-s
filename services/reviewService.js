const { query } = require("../database/db");

/**
 * Retrieve all reviews from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of reviews.
 * @throws {Error} If an error occurs while fetching the reviews.
 */
const getReviews = async () => {
    try {
        let sql = `SELECT * FROM reviews`;
        const reviews = await query(sql);
        return reviews;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieve a specific review by its ID from the database.
 * @param {number} reviews_ID - The ID of the review to retrieve.
 * @returns {Promise<Array>} A promise that resolves to an array containing the specified review.
 * @throws {Error} If an error occurs while fetching the review.
 */
const getReviewsById = async(reviews_ID) => {
    try {
        let sql = `SELECT * FROM reviews WHERE review_ID = ?`;
        const reviews = await query(sql, [reviews_ID]);
        return reviews;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieve all reviews associated with a specific product from the database.
 * @param {number} product_ID - The ID of the product to retrieve reviews for.
 * @returns {Promise<Array>} A promise that resolves to an array of reviews for the specified product.
 * @throws {Error} If an error occurs while fetching the reviews.
 */
const getReviewsByProductId = async(product_ID) => {
    try {
        let sql = `SELECT * FROM reviews WHERE product_ID = ?`;
        const reviews = await query(sql, [product_ID]);
        return reviews;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieve the average rating for a specific product from the database.
 * @param {number} product_ID - The ID of the product to retrieve the average rating for.
 * @returns {Promise<Array>} A promise that resolves to the average rating for the specified product.
 * @throws {Error} If an error occurs while fetching the average rating.
 */
const getRatingByProductId = async(product_ID) => {
    try {
        let sql = `SELECT AVG(rating) AS averageRating FROM reviews WHERE product_ID = ?`;
        const averageRating = await query(sql, [product_ID]);
        return averageRating;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Insert a new review into the database.
 * @param {number} customer_ID - The ID of the customer submitting the review.
 * @param {number} product_ID - The ID of the product being reviewed.
 * @param {number} rating - The rating given in the review.
 * @param {string} review_Text - The text content of the review.
 * @returns {Promise<Array>} A promise that resolves to the newly added review.
 * @throws {Error} If an error occurs while inserting the review.
 */
const insertReviews = async(customer_ID, product_ID, rating, review_Text) => {
    try {
        let sql = `INSERT INTO reviews 
            (customer_ID, product_ID, rating, review_Text)
            VALUES
            (?, ?, ?, ?)
            `;
        const result = await query(sql,
            [
                customer_ID,
                product_ID, 
                rating, 
                review_Text
            ]);
        let addedReviews = await query("SELECT * FROM reviews WHERE review_ID = ?", [result?.insertId]);
        return addedReviews;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Delete a specific review from the database.
 * @param {number} review_ID - The ID of the review to delete.
 * @returns {Promise<Array>} A promise that resolves to the deleted review.
 * @throws {Error} If an error occurs while deleting the review.
 */
const deleteReviews = async (review_ID) => {
    try {
        let sql = `DELETE FROM reviews WHERE review_ID = ?`;
        const reviews = await query(sql, [review_ID]);
        return reviews;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getReviews,
    getReviewsById,
    getReviewsByProductId,
    getRatingByProductId,
    insertReviews,
    deleteReviews,
}
