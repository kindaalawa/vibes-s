const { check } = require('express-validator');

const insertAddressValidation = [
  check('customer_ID').notEmpty().withMessage('Customer ID required'),
  check('region').notEmpty().withMessage('Region is required'),
  check('street').notEmpty().withMessage('Street is required'),
  check('building').notEmpty().withMessage('Building is required'),
  check('floor').isNumeric().withMessage('Floor must be a number'),
];

const updateAddressValidation = [
  check('address_ID').notEmpty().withMessage('Address ID is required'),
  check('region').notEmpty().withMessage('Region is required'),
  check('street').notEmpty().withMessage('Street is required'),
  check('building').notEmpty().withMessage('Building is required'),
  check('floor').isNumeric().withMessage('Floor must be a number'),
];

module.exports = {
  insertAddressValidation,
  updateAddressValidation,
}