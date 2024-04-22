const { query } = require("../database/db");

/**
 * Retrieve all addresses from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of addresses.
 * @throws {Error} If there's an error during the database query.
 */
const getAddresses = async () => {
    try {
        let sql = `SELECT * FROM address`;
        const addresses = await query(sql);
        return addresses;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieve an address by its ID.
 * @param {number} address_ID - The ID of the address to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the address object or null if not found.
 * @throws {Error} If there's an error during the database query.
 */
const getAddressById = async (address_ID) => {
    try {
        let sql = `SELECT * FROM address WHERE address_ID = ?`;
        const address = await query(sql, [address_ID]);
        return address;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieve addresses by customer ID.
 * @param {number} customer_ID - The ID of the customer.
 * @returns {Promise<Array>} A promise that resolves to an array of addresses for the given customer.
 * @throws {Error} If there's an error during the database query.
 */
const getAddressByCustomerId = async (customer_ID) => {
    try {
        let sql = `SELECT * FROM address WHERE customer_ID = ?`;
        const address = await query(sql, [customer_ID]);
        return address;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Insert a new address into the database.
 * @param {number} customer_ID - The ID of the customer associated with the address.
 * @param {string} region - The region of the address.
 * @param {string} street - The street of the address.
 * @param {string} building - The building of the address.
 * @param {number|null} floor - The floor of the address (nullable).
 * @param {string|null} moredetails - Additional details about the address (nullable).
 * @returns {Promise<Object>} A promise that resolves to the added address object.
 * @throws {Error} If there's an error during the database query.
 */
const insertAddress = async (customer_ID, region, street, building, floor, moredetails) => {
    try {
        let sql = `INSERT INTO address 
            (customer_ID, region, street, building, floor, moredetails)
            VALUES (?, ?, ?, ?, ?, ?)`;
        const result = await query(sql, [customer_ID, region, street, building, floor, moredetails]);
        let addedAddress = await query("SELECT * FROM address WHERE address_ID = ?", [result?.insertId]);
        return addedAddress;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Update an existing address in the database.
 * @param {Object} address - The address object containing fields to be updated.
 * @param {number} address.address_ID - The ID of the address to update.
 * @param {string} address.region - The updated region.
 * @param {string} address.street - The updated street.
 * @param {string} address.building - The updated building.
 * @param {number|null} address.floor - The updated floor (nullable).
 * @param {string|null} address.moredetails - The updated additional details (nullable).
 * @throws {Error} If there's an error during the database query.
 */
const updateAddress = async (address) => {
    try {
        const { address_ID, region, street, building, floor, moredetails } = address;

        let sql = `UPDATE address SET 
            region = ?, 
            street = ?, 
            building = ?,
            floor = ?,
            moredetails = ?
            WHERE address_ID = ?`;
        await query(sql, [region, street, building, floor, moredetails, address_ID]);
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Delete an address from the database.
 * @param {number} address_ID - The ID of the address to delete.
 * @returns {Promise<Object>} A promise that resolves to the deleted address object.
 * @throws {Error} If there's an error during the database query.
 */
const deleteAddress = async (address_ID) => {
    try {
        let sql = `DELETE FROM address WHERE address_ID = ?`;
        const address = await query(sql, [address_ID]);
        return address;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getAddresses,
    getAddressById,
    getAddressByCustomerId,
    insertAddress,
    updateAddress,
    deleteAddress,
};
