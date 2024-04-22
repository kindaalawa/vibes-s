const express = require('express');
const {
    getReviewsController,
    getReviewsByIdController,
    getReviewsByProductIdController,
    getRatingByProductIdController,
    insertReviewsController,
    deleteReviewsController,
} = require('../controllers/reviewController');

const {
    insertReviewsValidation,
} = require('../validations/reviewValidator');

const router = express.Router();

router.get('/reviews', getReviewsController);
router.post('/reviews', getReviewsByIdController);
router.post('/reviewsPerProduct', getReviewsByProductIdController);
router.post('/ratingPerProduct', getRatingByProductIdController);
router.post('/newReviews', insertReviewsValidation, insertReviewsController);
router.delete('/reviews', deleteReviewsController);

module.exports = router;