const { query } = require("../database/db");

/**
 * Retrieve all categories from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of categories.
 * @throws {Error} If there's an error during the database query.
 */
const getCategories = async () => {
    try {
        let sql = `SELECT * FROM category`;
        const categories = await query(sql);
        return categories;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieve a category by its ID.
 * @param {number} category_ID - The ID of the category to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the category object or null if not found.
 * @throws {Error} If there's an error during the database query.
 */
const getCategoryById = async (category_ID) => {
    try {
        let sql = `SELECT * FROM category WHERE category_ID = ?`;
        const category = await query(sql, [category_ID]);
        return category;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Insert a new category into the database.
 * @param {string} category_Name - The name of the category to be added.
 * @returns {Promise<Object>} A promise that resolves to the added category object.
 * @throws {Error} If there's an error during the database query.
 */
const insertCategory = async (category_Name) => {
    try {
        let sql = `INSERT INTO category
        (category_Name)
        VALUES 
        (?)`;
        const result = await query(sql, [category_Name]);
        let addedCategory = await query("SELECT * FROM category WHERE category_ID = ?", [result?.insertId]);
        return addedCategory;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Update an existing category in the database.
 * @param {Object} category - The category object containing fields to be updated.
 * @param {number} category.category_ID - The ID of the category to update.
 * @param {string} category.category_Name - The updated name of the category.
 * @throws {Error} If there's an error during the database query.
 */
const updateCategory = async (category) => {
    try {
        const { category_ID, category_Name } = category;
        
        let sql = `UPDATE category SET
        category_Name = ?
        WHERE category_ID = ?
        `;
        await query(sql, [category_Name, category_ID]);
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Delete a category from the database by ID.
 * @param {number} category_ID - The ID of the category to delete.
 * @returns {Promise<Object>} A promise that resolves to the deleted category object.
 * @throws {Error} If there's an error during the database query.
 */
const deleteCategory = async (category_ID) => {
    try {
        let sql = `DELETE FROM category WHERE category_ID = ?`;
        const account = await query(sql, [category_ID]);
        return account;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getCategories,
    getCategoryById,
    insertCategory,
    updateCategory,
    deleteCategory,
}
