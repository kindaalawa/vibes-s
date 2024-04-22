const { check } = require('express-validator');

const insertOrderValidation = [
  check('cart_ID').notEmpty().withMessage('Cart ID is required'),
];

module.exports = {
  insertOrderValidation,
};
