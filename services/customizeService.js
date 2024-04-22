const { query } = require("../database/db");

/**
 * Retrieve all customization records from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of customization objects.
 * @throws {Error} If there's an error during the database query.
 */
const getCustomize = async () => {
    try {
        const sql = `SELECT * FROM customization`;
        const customize = await query(sql);
        return customize;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieve a customization record by its ID.
 * @param {number} customization_ID - The ID of the customization record to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the customization object or null if not found.
 * @throws {Error} If there's an error during the database query.
 */
const getCustomizeById = async (customization_ID) => {
    try {
        const sql = `SELECT * FROM customization WHERE customization_ID = ?`;
        const customize = await query(sql, [customization_ID]);
        return customize;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieve all customization records associated with a specific product.
 * @param {number} product_ID - The ID of the product for which to retrieve customization records.
 * @returns {Promise<Array>} A promise that resolves to an array of customization objects.
 * @throws {Error} If there's an error during the database query.
 */
const getCustomizeByProductId = async (product_ID) => {
    try {
        const sql = `SELECT * FROM customization WHERE product_ID = ?`;
        const customize = await query(sql, [product_ID]);
        return customize;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Insert a new customization record into the database.
 * @param {string} customization_Size - The size for the customization.
 * @param {string} customization_Color - The color for the customization.
 * @param {number} product_ID - The ID of the product associated with the customization.
 * @returns {Promise<Object>} A promise that resolves to the added customization object.
 * @throws {Error} If there's an error during the database query.
 */
const insertCustomize = async (customization_Size, customization_Color, product_ID) => {
    try {
        const sql = `INSERT INTO customization 
            (customization_Size, customization_Color, product_ID)
            VALUES (?, ?, ?)`;

        const result = await query(sql, 
            [
                customization_Size, 
                customization_Color, 
                product_ID
            ]);
        const addedCustomize = await query("SELECT * FROM customization WHERE customization_ID = ?", [result?.insertId]);
        return addedCustomize;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Update an existing customization record in the database.
 * @param {Object} customize - The customization object containing fields to be updated.
 * @param {number} customize.product_ID - The ID of the product associated with the customization.
 * @param {string} customize.customization_Size - The updated size for the customization.
 * @param {string} customize.customization_Color - The updated color for the customization.
 * @throws {Error} If there's an error during the database query.
 */
const updateCustomize = async (customize) => {
    try {
        const { product_ID, customization_Size, customization_Color } = customize;

        const sql = `UPDATE customization SET 
            customization_Size = ?, 
            customization_Color = ?
            WHERE product_ID = ?`;

        await query(sql, 
            [
                customization_Size, 
                customization_Color, 
                product_ID
            ]);
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Delete a customization record from the database by ID.
 * @param {number} customization_ID - The ID of the customization record to delete.
 * @returns {Promise<Object>} A promise that resolves to the deleted customization object.
 * @throws {Error} If there's an error during the database query.
 */
const deleteCustomize = async (customization_ID) => {
    try {
        let sql = `DELETE FROM customization WHERE customization_ID = ?`;
        const customize = await query (sql, [customization_ID]);
        return customize;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getCustomize,
    getCustomizeById,
    getCustomizeByProductId,
    insertCustomize,
    updateCustomize,
    deleteCustomize,
};
