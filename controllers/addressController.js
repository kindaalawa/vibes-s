const { validationResult } = require("express-validator");
const { 
    getAddresses,
    getAddressById,
    getAddressByCustomerId,
    insertAddress,
    updateAddress,
    deleteAddress,
} = require("../services/addressService");

const getAllAddressesController = async (req, res) => {
    try {
        const addresses = await getAddresses();
        res.render('address', { addresses, addedAddress:null});
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getAdressByIdController = async (req, res) => {
    const { address_ID } = req.body;
    if (!address_ID){
        return res.status(400).json({ message: "Missing address ID"});
    }
    try {
        const result = await getAddressById(address_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getAdressByCustomerIdController = async (req, res) => {
    const { customer_ID } = req.body;
    if (!customer_ID){
        return res.status(400).json({ message: "Missing customer ID"});
    }
    try {
        const result = await getAddressByCustomerId(customer_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const insertAddressController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { customer_ID, region, street, building, floor, moredetails } = req.body;

    try {
        const response = await insertAddress(customer_ID, region, street, building, floor, moredetails);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const updateAddressController = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address_ID, region, street, building, floor, moredetails } = req.body;

    try {
        const response = await updateAddress({ address_ID, region, street, building, floor, moredetails });
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const deleteAddressController = async (req, res) => {
    const { address_ID } = req.body;

    if (!address_ID) {
        return res.status(400).json({ message: "Missing address ID" });
    }

    try {
        const result = await deleteAddress(address_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

module.exports = {
    getAllAddressesController,
    getAdressByIdController,
    getAdressByCustomerIdController,
    insertAddressController,
    updateAddressController,
    deleteAddressController,
};