const { query } = require("../database/db");

/**
 * Retrieve all customers from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of customer objects.
 * @throws {Error} If there's an error during the database query.
 */
const getCustomers = async () => {
    try {
        let sql = `SELECT * FROM customer`;
        const customers = await query(sql);
        return customers;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieve a customer by their ID.
 * @param {number} customer_ID - The ID of the customer to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the customer object or null if not found.
 * @throws {Error} If there's an error during the database query.
 */
const getCustomerById = async (customer_ID) => {
    try {
        let sql = `SELECT * FROM customer WHERE customer_ID = ?`;
        const customer = await query(sql, [customer_ID]);
        return customer;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Insert a new customer into the database.
 * @param {string} customer_FullName - The full name of the customer.
 * @param {string} customer_Email - The email address of the customer.
 * @param {string} customer_Password - The password of the customer.
 * @param {number} customer_PhoneNumber - The phone number of the customer.
 * @returns {Promise<Object>} A promise that resolves to the added customer object.
 * @throws {Error} If there's an error during the database query.
 */
const insertCustomer = async (customer_FullName, customer_Email, customer_Password, customer_PhoneNumber) => {
    try {
        let sql = `INSERT INTO customer
        (customer_FullName, customer_Email, customer_Password, customer_PhoneNumber)
        VALUES
        (?, ?, ?, ?)`;
        const result = await query (sql, 
            [
                customer_FullName,
                customer_Email,
                customer_Password,
                customer_PhoneNumber
            ]);
        const addedCustomer = await query("SELECT * FROM customer WHERE customer_ID = ?", [result?.insertId]);
        return addedCustomer;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Update an existing customer in the database.
 * @param {Object} customer - The customer object containing fields to be updated.
 * @param {number} customer.customer_ID - The ID of the customer to update.
 * @param {string} customer.customer_FullName - The updated full name of the customer.
 * @param {string} customer.customer_Email - The updated email address of the customer.
 * @param {string} customer.customer_Password - The updated password of the customer.
 * @param {number} customer.customer_PhoneNumber - The updated phone number of the customer.
 * @throws {Error} If there's an error during the database query.
 */
const updateCustomer = async (customer) => {
    try {
        const {customer_ID, customer_FullName, customer_Email, customer_Password, customer_PhoneNumber} = customer;

        let sql = `UPDATE customer SET
        customer_FullName = ?,
        customer_Email = ?,
        customer_Password = ?,
        customer_PhoneNumber = ?
        WHERE customer_ID = ?`;
        await query(sql,
            [
                customer_FullName,
                customer_Email,
                customer_Password,
                customer_PhoneNumber,
                customer_ID
            ]);
    } catch(error) {
        throw new Error(error);
    }
}

/**
 * Delete a customer from the database by ID.
 * @param {number} customer_ID - The ID of the customer to delete.
 * @returns {Promise<Object>} A promise that resolves to the deleted customer object.
 * @throws {Error} If there's an error during the database query.
 */
const deleteCustomer = async (customer_ID) => {
    try {
        let sql = `DELETE FROM customer WHERE customer_ID = ?`;
        const customer = await query (sql, [customer_ID]);
        return customer;
    } catch(error) {
        throw new Error(error);
    }
}

module.exports = {
    getCustomers,
    getCustomerById,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}
