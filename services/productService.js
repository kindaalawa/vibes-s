const { query } = require("../database/db");

/**
 * Retrieve all product records from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 * @throws {Error} If there's an error during the database query.
 */
const getProducts = async () => {
    try {
        let sql = `SELECT * FROM product`;
        const products = await query(sql);
        return products;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieve a product record by its ID.
 * @param {number} product_ID - The ID of the product record to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the product object or null if not found.
 * @throws {Error} If there's an error during the database query.
 */
const getProductById = async (product_ID) => {
    try {
        let sql = `SELECT * FROM product WHERE product_ID = ?`;
        const product = await query(sql, [product_ID]);
        return product;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieve product records by category ID.
 * @param {number} category_ID - The ID of the category associated with the products.
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 * @throws {Error} If there's an error during the database query.
 */
const getProductByCategoryId = async (category_ID) => {
    try {
        let sql = `SELECT * FROM product WHERE category_ID =?`;
        const products = await query(sql, [category_ID]);
        return products;
    } catch(error) {
        throw new Error(error);
    }
}

/**
 * Retrieve products from low to high price by category ID.
 * @param {number} category_ID - The ID of the category associated with the products.
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 * @throws {Error} If there's an error during the database query.
 */
const getProductsFromLToHPrice = async (category_ID) => {
    try {
        let sql = `SELECT *
        FROM product
        WHERE category_ID = ?
        ORDER BY product_Price ASC;
        `;
        const products = await query(sql, [category_ID]);
        return products;
    } catch(error) {
        throw new Error(error);
    }
}

/**
 * Retrieve products from high to low price by category ID.
 * @param {number} category_ID - The ID of the category associated with the products.
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 * @throws {Error} If there's an error during the database query.
 */
const getProductsFromHToLPrice = async (category_ID) => {
    try {
        let sql = `SELECT *
        FROM product
        WHERE category_ID = ?
        ORDER BY product_Price DESC;
        `;
        const products = await query(sql, [category_ID]);
        return products;
    } catch(error) {
        throw new Error(error);
    }
}

/**
 * Insert a new product record into the database.
 * @param {string} product_Name - The name of the product.
 * @param {Blob} product_IMG - The image of the product.
 * @param {string} product_Description - The description of the product.
 * @param {string} product_Info - Additional information about the product.
 * @param {number} product_Price - The price of the product.
 * @param {number} category_ID - The ID of the category associated with the product.
 * @returns {Promise<Object>} A promise that resolves to the added product object.
 * @throws {Error} If there's an error during the database query.
 */
const insertProduct = async (product_Name, product_IMG, product_Description, product_Info, product_Price, category_ID) => {
    try {
        let sql = `INSERT INTO product
            (product_Name, product_IMG, product_Description, product_Info, product_Price, category_ID)
            VALUES 
            (?, ?, ?, ?, ?, ?);
            `;
        const result = await query(sql,
            [
                product_Name,
                product_IMG, 
                product_Description, 
                product_Info, 
                product_Price, 
                category_ID
            ]);
        const addedProduct = await query("SELECT * FROM product WHERE product_ID = ?", [result?.insertId]);
        return addedProduct;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Update an existing product record in the database.
 * @param {Object} product - The product object with updated information.
 * @returns {Promise<Object>} A promise that resolves to the result of the update query.
 * @throws {Error} If there's an error during the database query.
 */
const updateProduct = async (product) => {
    try {
        const { product_ID, product_Name, product_IMG, product_Description, product_Info, product_Price, category_ID } = product;

        let sql = `UPDATE product SET
            product_Name = ?,
            product_IMG = ?,
            product_Description = ?,
            product_Info = ?,
            product_Price = ?,
            category_ID = ?
            WHERE product_ID = ?
            `;
        const result = await query(sql,
            [
                product_Name,
                product_IMG ,
                product_Description,
                product_Info,
                product_Price,
                category_ID,
                product_ID
            ]);
            return result;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Delete a product record from the database by ID.
 * @param {number} product_ID - The ID of the product record to delete.
 * @returns {Promise<Object>} A promise that resolves to the deleted product object.
 * @throws {Error} If there's an error during the database query.
 */
const deleteProduct = async(product_ID) => {
    try {
        let sql = `DELETE FROM product WHERE product_ID = ?`;
        const product = await query (sql, [product_ID]);
        return product;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getProducts,
    getProductById,
    getProductByCategoryId,
    getProductsFromLToHPrice,
    getProductsFromHToLPrice,
    insertProduct,
    updateProduct,
    deleteProduct,
}
