const { query } = require('../database/db');

/**
 * Retrieve all order records from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of order objects.
 * @throws {Error} If there's an error during the database query.
 */
const getOrders = async () => {
  try {
    let sql = `SELECT * FROM orders`;
    const orders = await query(sql);
    return orders;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieve an order record by its ID.
 * @param {number} order_ID - The ID of the order record to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the order object or null if not found.
 * @throws {Error} If there's an error during the database query.
 */
const getOrderById = async (order_ID) => {
  try {
    let sql = `SELECT * FROM orders WHERE order_ID = ?`;
    const order = await query(sql, [order_ID]);
    return order;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Insert a new order record into the database.
 * @param {number} cart_ID - The ID of the cart associated with the order.
 * @returns {Promise<Object>} A promise that resolves to the added order object.
 * @throws {Error} If there's an error during the database query.
 */
const insertOrder = async (cart_ID) => {
  try {
      let sql = `INSERT INTO orders (cart_ID)
          VALUES
          (?)
          `;
      const result = await query(sql,
          [
              cart_ID
          ]);
      let addedOrder = await query("SELECT * FROM orders WHERE order_ID = ?", [result?.insertId]);
      return addedOrder;
  } catch (error) {
      throw new Error(error);
  }
};

/**
 * Delete an order record from the database by ID.
 * @param {number} order_ID - The ID of the order record to delete.
 * @returns {Promise<Object>} A promise that resolves to the deleted order object.
 * @throws {Error} If there's an error during the database query.
 */
const deleteOrder = async (order_ID) => {
  try {
      let sql = `DELETE FROM orders WHERE order_ID = ?`;
      const order = await query(sql, [order_ID]);
      return order;
  } catch (error) {
      throw new Error(error);
  }
};

module.exports = {
  getOrders,
  getOrderById,
  insertOrder,
  deleteOrder
};
