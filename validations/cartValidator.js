const { check } = require('express-validator');

const insertCartValidation = [
  check('product_ID').notEmpty().withMessage('Product ID is required'),
  check('customer_ID').notEmpty().withMessage('Customer ID is required'),
  check('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

const updateCartValidation = [
  check('product_ID').notEmpty().withMessage('Product ID is required'),
  check('customer_ID').notEmpty().withMessage('Customer ID is required'),
  check('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

module.exports = {
  insertCartValidation,
  updateCartValidation
};
