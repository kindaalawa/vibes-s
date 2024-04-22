const { check } = require('express-validator');

const insertReviewsValidation = [
  check('customer_ID').notEmpty().withMessage('Customer ID is required'),
  check('product_ID').notEmpty().withMessage('Product ID is required'),
  check('rating').notEmpty().withMessage('Rating is required'),
  check('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
];

module.exports = {
  insertReviewsValidation,
};
