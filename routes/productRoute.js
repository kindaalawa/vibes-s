const express = require('express');
const {
    getAllProductsController,
    getProductByIdController,
    getProductByCategoryNameController,
    getProductByNameController,
    getBestSellersController,
    getProductsFromLToHPriceController,
    getProductsFromHToLPriceController,
    insertProductController,
    updateProductController,
    deleteProductController
} = require('../controllers/productController');

const {
    insertProductValidation,
    updateProductValidation,
} = require('../validations/productValidator');

const router = express.Router();

router.get('/products', getAllProductsController);
router.post('/product', getProductByIdController);
router.get('/category/:category_Name/products', getProductByCategoryNameController);
router.get('/search-results', getProductByNameController);
router.get('/bestSellers', getBestSellersController);
router.post('/byCategoryFromLowToHigh', getProductsFromLToHPriceController);
router.post('/byCategoryFromHighToLow', getProductsFromHToLPriceController);
router.post('/newProduct', insertProductValidation, insertProductController);
router.put('/product', updateProductValidation, updateProductController );
router.delete('/product', deleteProductController);

module.exports = router;
