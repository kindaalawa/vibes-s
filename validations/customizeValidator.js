const { check } = require('express-validator');

const insertCustomizeValidation = [
    check('customization_Size').notEmpty().withMessage('Customize Size is required'),
    check('customization_Color').notEmpty().withMessage('Customize Color is required'),
    check('product_ID').notEmpty().withMessage('Product ID is required'),
];

const updateCustomizeValidation = [
    check('customization_Size').notEmpty().withMessage('Customize Size is required'),
    check('customization_Color').notEmpty().withMessage('Customize Color is required'),
    check('product_ID').notEmpty().withMessage('Product ID is required'),
];

module.exports = {
    insertCustomizeValidation,
    updateCustomizeValidation,
};
