const { check } = require('express-validator');

const insertProductValidation = [
  check('product_Name').notEmpty().withMessage('Product Name is required'),
  check('product_Description').notEmpty().withMessage('Product Description is required'),
  check('product_Info').notEmpty().withMessage('Product Info is required'),
  check('product_Price').notEmpty().withMessage('Product Price is required'),
  check('category_ID').notEmpty().withMessage('Category ID is required'),
];

const updateProductValidation = [
  check('product_ID').notEmpty().withMessage('Product ID is required'),
  check('product_Name').notEmpty().withMessage('Product Name is required'),
  check('product_Description').notEmpty().withMessage('Product Description is required'),
  check('product_Info').notEmpty().withMessage('Product Info is required'),
  check('product_Price').notEmpty().withMessage('Product Price is required'),
  check('category_ID').notEmpty().withMessage('Category ID is required'),
];

module.exports = {
  insertProductValidation,
  updateProductValidation,
};
