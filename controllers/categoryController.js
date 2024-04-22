const { validationResult } = require("express-validator");
const { 
    getCategories, 
    getCategoryById, 
    insertCategory,
    updateCategory, 
    deleteCategory } = require("../services/categoryService");

const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await getCategories();
        res.render("categories-nav", {categories} );
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const getCategoryByIdController = async (req, res) => {
    const { category_ID } = req.body;
    if (!category_ID){
        return res.status(400).json({ message: "Missing category ID"});
    }
    try {
        const result = await getCategoryById(category_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const insertCategoryController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { category_Name } = req.body;

    try {
        const response = await insertCategory(category_Name);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const updateCategoryController = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { category_ID, category_Name } = req.body;

    try {
        const response = await updateCategory({ category_ID, category_Name });
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

const deleteCategoryController = async (req, res) => {
    const { category_ID } = req.body;

    if (!category_ID) {
        return res.status(400).json({ message: "missing category ID" });
    }

    try {
        const result = await deleteCategory(category_ID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

module.exports = {
    getAllCategoriesController,
    getCategoryByIdController,
    insertCategoryController,
    updateCategoryController,
    deleteCategoryController,
};
