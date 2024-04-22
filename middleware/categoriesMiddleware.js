const { getCategories } = require('../services/categoryService'); // Adjust the path as needed

const categoriesMiddleware = async (req, res, next) =>{
    try {
        const categories = await getCategories();
        res.locals.categories = categories;
        next();
    } catch (error) {
        console.error('Error fetching categories:', error);
        next(error);
    }
}

module.exports = categoriesMiddleware;