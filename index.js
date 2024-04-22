// Import required modules
const express = require("express");
require('dotenv').config(); // Load environment variables for port and database configurations
const { query } = require("./database/db");
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require("ejs");
const path = require("path");
const cookieParser = require('cookie-parser');
const {getProductByCategoryName, getProducts} = require("./services/productService");
// Initialize express application
const app = express();

// Middleware for parsing incoming request bodies in urlencoded and JSON formats
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware for handling cookies in requests
app.use(cookieParser());

// Middleware for enabling Cross-Origin Resource Sharing (CORS) with default settings
app.use(cors({ origin: '*' }));

// Set up EJS as the templating engine and define the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import route modules for different functionalities
const authRoutes = require('./routes/authRoutes');
const customerRoute = require('./routes/customerRoute');
const addressRoute = require('./routes/addressRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const reviewRoute = require('./routes/reviewRoute');
const orderRoute = require('./routes/orderRoute');
const shipmentRoute = require('./routes/shipmentRoute');
const customizeRoute = require('./routes/customizeRoute');

// Middleware to add category data to every request
const categoriesMiddleware = require('./middleware/categoriesMiddleware');
app.use(categoriesMiddleware);

// Define routes for each feature of the application
app.use(authRoutes);
app.use('/', customerRoute);
app.use('/api/address', addressRoute);
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/review', reviewRoute);
app.use('/api/order', orderRoute);
app.use('/api/shipment', shipmentRoute);
app.use('/api/customize', customizeRoute);

// Route for homepage
app.get("/", async (req, res) => {
    res.render('index');
});

// Routes for user authentication and password reset
app.get('/signup', (req, res) => {
    res.render('pages/signup');
});
app.get('/login', (req, res) => {
    res.render('pages/login');
});
app.get('/resetpass', (req, res) => {
    res.render('pages/resetpass');
});

// Route to display products by category
app.get('/category/:category_Name/products', async (req, res) => {
    const category_Name = req.params.category_Name;
    const products = await getProductByCategoryName(category_Name);
    res.render('pages/category-products', { category_Name: category_Name, products: products })
});

// Admin route to manage products
app.get('/admin', async (req, res) => {
    const products = await getProducts(); 
    res.render('pages/admin', { products: products, errors: [] });
});
app.post('/subscribe', async (req, res) => {
    const { email } = req.body; // Extract the email from the request body

    // Here, you'd use nodemailer or any other email-sending service to send a confirmation email to the provided email address.
    // Your nodemailer setup and sending logic will go here.

    // Respond to the user indicating successful subscription or any error.
    res.send('Subscription successful! Please check your email for confirmation.');
});

// Define a route for the Christmas sale products
app.get('/christmas-sale-products', (req, res) => {
    const message = `
        <div style="text-align: center; padding: 20px;">
            <h1 style="color: #FF0000; font-size: 24px;">Exciting News!</h1>
            <p style="font-size: 18px; margin-bottom: 20px;">Our Christmas Sale Products are coming soon...</p>
            <p style="font-size: 18px;">Stay tuned for amazing discounts and festive deals!</p>
            <div id="countdown" style="font-size: 24px; color: #FF0000; margin-top: 20px;"></div>
        </div>
        <script>
            // You can customize the countdown date and time
            const countdownDate = new Date('December 25, 2023 00:00:00').getTime();

            // Update the countdown every 1 second
            const countdownInterval = setInterval(() => {
                const now = new Date().getTime();
                const distance = countdownDate - now;

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById('countdown').innerHTML = \`<strong>Countdown:</strong> \${days}d \${hours}h \${minutes}m \${seconds}s\`;

                // If the countdown is over, clear the interval
                if (distance < 0) {
                    clearInterval(countdownInterval);
                    document.getElementById('countdown').innerHTML = '<strong>Our Christmas Sale is now live!</strong>';
                }
            }, 1000);
        </script>
    `;
    res.send(message);
});


// Static file serving for CSS, JavaScript, and images
app.use(express.static('static'));

// Start the server and listen on a port from environment variable or default to 3000
const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
