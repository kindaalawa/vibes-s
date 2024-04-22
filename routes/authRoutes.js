const express = require('express');
const router = express.Router();
const authenticateMiddleware = require('../middleware/authenticateMiddleware');

router.post('/login', authenticateMiddleware, (req, res) => {
    res.redirect('/');
});

module.exports = router;
