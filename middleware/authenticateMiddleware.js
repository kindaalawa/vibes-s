const jwt = require('jsonwebtoken');
const { authenticate } = require('../services/customerService'); // make sure this service function exists and works as expected

const authenticateMiddleware = async (req, res, next) => {
    const { customer_Email, customer_Password } = req.body;

    try {
        const result = await authenticate(customer_Email, customer_Password);

        if (result.status === 'emailNotFound') {
            return res.status(401).render('pages/login', { message: "Unregistered email" });
        }

        if (result.status === 'incorrectPassword') {
            return res.status(401).render('pages/login', { message: "Incorrect password" });
        }

        if (result.status === 'ok') {
            const token = jwt.sign(
                { userId: result.user.customer_ID },
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            );
    
            res.cookie('authToken', token, { httpOnly: true });
            next();
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).render('pages/login', { message: "An error occurred during the login process" });
    }
};


module.exports = authenticateMiddleware;