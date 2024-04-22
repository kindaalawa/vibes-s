const { validationResult } = require("express-validator");
const {
    getProducts,
    getProductById,
    getProductByCategoryName,
    getProductByName,
    getBestSellers,
    getProductsFromLToHPrice,
    getProductsFromHToLPrice,
    insertProduct,
    updateProduct,
    deleteProduct,
} = require("../services/productService");

const getAllProductsController = async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getProductByIdController = async (req, res) => {
    const { product_ID } = req.body;

    if(!product_ID){
        return res.status(400).json({message: "missing product ID"});
    }
    try {
        const result = await getProductById(product_ID);
        res.status(200).json({ result });
    } catch(error) {
        res.status(500).json({ message: error?.message });
    }
}

const getProductByCategoryNameController = async (req, res) => {
    const category_Name = req.params.category_Name;

    if(!category_Name){
        return res.status(400).json({message: "missing category Name"});
    }
    try {
        const products = await getProductByCategoryName(category_Name);
        products.forEach(product => {
            if (product.product_IMG) {
                const imageBase64 = Buffer.from(product.product_IMG, 'binary').toString('base64');
                product.product_IMG = `data:image/png;base64,${imageBase64}`;
            }
        });        
        res.render('pages/category-products', {
            category_Name: category_Name,
            products: products
        })
    } catch(error) {
        res.status(500).json({ message: error?.message });
    }
}

const getProductByNameController = async (req, res, next) => { 
    try {
        const product_Name = req.query.product_Name;
        const products = await getProductByName(product_Name);
        res.render('pages/search-results', { products: products });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const getBestSellersController = async (req, res) => {
    try {
        const bestSellers = await getBestSellers();
        res.status(200).json({ bestSellers });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const getProductsFromLToHPriceController = async (req, res) => {
    const { category_ID } = req.body;

    if(!category_ID){
        return res.status(400).json({message: "missing category ID"});
    }
    try {
        const result = await getProductsFromLToHPrice(category_ID);
        res.status(200).json({ result });
    } catch(error) {
        res.status(500).json({ message: error?.message });
    }
}

const getProductsFromHToLPriceController = async (req, res) => {
    const { category_ID } = req.body;

    if(!category_ID){
        return res.status(400).json({message: "missing category ID"});
    }
    try {
        const result = await getProductsFromHToLPrice(category_ID);
        res.status(200).json({ result });
    } catch(error) {
        res.status(500).json({ message: error?.message });
    }
}

const insertProductController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('pages/admin/add-product',{ errors: errors.array() });
    }

    const {product_Name, product_IMG, product_Description, product_Info, product_Price, category_ID} = req.body;

    try {
        const response = await insertProduct(product_Name, product_IMG, product_Description, product_Info, product_Price, category_ID);
        res.redirect('pages/admin/products?message=Productaddedsuccessfully');
    } catch (error) {
        res.render('pages/admin/add-product', { errors: [{msg: errors.message}] });
    }
}

const updateProductController = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { product_ID, product_Name, product_IMG, product_Description, product_Info, product_Price, category_ID } = req.body;

    try {
        const response = await updateProduct({ product_ID, product_Name, product_IMG, product_Description, product_Info, product_Price, category_ID });
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const deleteProductController = async (req, res) => {
    const { product_ID } = req.body;

    if (!product_ID) {
        return res.status(400).json({ message: "missing product id" });
    }

    try {
        const result = await deleteProduct(product_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

module.exports = {
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
};