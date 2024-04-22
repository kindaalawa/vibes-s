const { check } = require('express-validator');

const insertCategoryValidation = [
    check('category_Name').notEmpty().withMessage('Category Name is required'),
];

const updateCategoryValidation = [
    check('category_ID').notEmpty().withMessage('Category ID is required'),
    check('category_Name').notEmpty().withMessage('Category Name is required'),
];

module.exports = {
    insertCategoryValidation,
    updateCategoryValidation,
};
