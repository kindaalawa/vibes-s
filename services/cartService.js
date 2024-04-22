const { query } = require("../database/db");

/**
 * Retrieve all carts from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of carts.
 * @throws {Error} If there's an error during the database query.
 */
const getCarts = async () => {
    try {
        let sql = `SELECT * FROM cart`;
        const carts = await query(sql);
        return carts;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieve a cart by its ID.
 * @param {number} cart_ID - The ID of the cart to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the cart object or null if not found.
 * @throws {Error} If there's an error during the database query.
 */
const getCartById = async (cart_ID) => {
    try {
        let sql = `SELECT * FROM cart WHERE cart_ID = ?`;
        const cart = await query(sql, [cart_ID]);
        return cart;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieve carts by customer ID.
 * @param {number} customer_ID - The ID of the customer.
 * @returns {Promise<Array>} A promise that resolves to an array of carts for the given customer.
 * @throws {Error} If there's an error during the database query.
 */
const getCartByCustomerId = async (customer_ID) => {
    try {
        let sql = `SELECT * FROM cart WHERE customer_ID = ?`;
        const cart = await query(sql, [customer_ID]);
        return cart;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Insert a new cart into the database.
 * @param {number} customer_ID - The ID of the customer associated with the cart.
 * @param {number} product_ID - The ID of the product in the cart.
 * @param {number} quantity - The quantity of the product in the cart.
 * @returns {Promise<Object>} A promise that resolves to the added cart object.
 * @throws {Error} If there's an error during the database query.
 */
const insertCart = async (customer_ID, product_ID, quantity) => {
    try {
        let sql = `INSERT INTO cart 
        (customer_ID, product_ID, quantity)
        VALUES (?, ?, ?)`;
        const result = await query(sql, [customer_ID, product_ID, quantity]);
        let addedCart = await query("SELECT * FROM cart WHERE cart_ID = ?", [result?.insertId]);
        return addedCart;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Update an existing cart in the database.
 * @param {Object} cart - The cart object containing fields to be updated.
 * @param {number} cart.customer_ID - The ID of the customer associated with the cart.
 * @param {number} cart.product_ID - The ID of the product in the cart.
 * @param {number} cart.quantity - The updated quantity of the product in the cart.
 * @throws {Error} If there's an error during the database query.
 */
const updateCart = async (cart) => {
    try {
        const { customer_ID, product_ID, quantity } = cart;

        let sql = `UPDATE cart SET
        product_ID = ?,
        quantity = ?
        WHERE customer_ID = ?`;
        await query(sql, [product_ID, quantity, customer_ID]);
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Delete a cart from the database by product ID.
 * @param {number} product_ID - The ID of the product in the cart to delete.
 * @returns {Promise<Object>} A promise that resolves to the deleted cart object.
 * @throws {Error} If there's an error during the database query.
 */
const deleteCart = async (product_ID) => {
    try {
        let sql = `DELETE FROM cart WHERE product_ID = ?`;
        const address = await query(sql, [product_ID]);
        return address;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getCarts,
    getCartById,
    getCartByCustomerId,
    insertCart,
    updateCart,
    deleteCart,
};
