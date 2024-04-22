const express = require('express');
const {
    getAllCategoriesController,
    getCategoryByIdController,
    insertCategoryController,
    updateCategoryController,
    deleteCategoryController,
} = require('../controllers/categoryController');

const {
    insertCategoryValidation,
    updateCategoryValidation,
} = require('../validations/categoryValidator');

const router = express.Router();

router.get('/categories', getAllCategoriesController);
router.post('/category', getCategoryByIdController);
router.post('/newCategory', insertCategoryValidation, insertCategoryController);
router.put('/category', updateCategoryValidation, updateCategoryController);
router.delete('/category', deleteCategoryController);

module.exports = router;
