# Vibesk 
# Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)


## Overview

The aim is to establish a website that boasts a front page where visitors can view suggested items of bags and utilize a search bar to discover more bags . Furthermore, users will have the capability to click on a product to access comprehensive particulars, including item availability, pricing, transaction particulars, customers feedback, and choices to complete a purchase or add products to their shopping cart. Specific details like cost and "currently unavailable" notifications will be readily visible to users without necessitating a click on the product. Customizing products option will be available too by offering the customer the ability to choose the color, size and if they want to write something on the bag .  
  
## Technologies. 

- *Backend:* Node.js, Express
- *Database:* MySQL
- *Server Monitoring:* nodemon
- *Testing:* Postman

## Dependencies

- [body-parser](https://www.npmjs.com/package/body-parser) - Middleware to parse incoming request bodies.
- [cors](https://www.npmjs.com/package/cors) - Express middleware for enabling CORS (Cross-Origin Resource Sharing).
- [dotenv](https://www.npmjs.com/package/dotenv) - Module to load environment variables from a .env file.
- [express](https://www.npmjs.com/package/express) - Web application framework for Node.js.
- [express-validator](https://www.npmjs.com/package/express-validator) - Middleware for request validation in Express.
- [moment](https://www.npmjs.com/package/moment) - Library for handling dates and times in JavaScript.
- [mysql2](https://www.npmjs.com/package/mysql2) - MySQL library for Node.js.
- [nodemon](https://www.npmjs.com/package/nodemon) - Utility to monitor changes in your Node.js application and automatically restart the server.


## Key Features

### Product Display and Customization

- **Organized Showcase:** Explore our product range through well-structured categories, easily sortable by price and product types.
  
- **Comprehensive Details:** Each product listing provides in-depth information, including descriptions, size options, material details, and opportunities for customization.

### User Interaction

- **User-Friendly Experience:** Enjoy a seamless browsing experience without the requirement for user login, except when placing orders or submitting reviews.

- **Efficient Search:** Find products effortlessly with our intuitive Search Bar, ensuring a convenient user experience.

### User Accounts and Engagement

- **Newsletter Subscription:** Stay informed and inspired by subscribing to our newsletter, receiving updates on new arrivals, exclusive sales, and complimentary digital goodies such as wallpapers and templates.

- **Organized User Management:** Manage user interactions effectively with dedicated Customer and Address tables for streamlined user account management.

### Ordering and Payment

- **Convenient Shopping Cart:** Benefit from a temporary data storage solution that keeps track of selected items during your browsing session.

- **Personalization Preferences:** Save and retrieve your customization preferences with our dedicated Customization Table for personalized products.

- **Trust-Building Reviews:** Foster trust through a robust review section for each product, allowing users to share their experiences and provide ratings.

### Order Management

- **Centralized Order Recording:** The Order Table serves as a central hub linked to users, recording every placed order for comprehensive order management.

- **Efficient Shipment Tracking:** The Shipment Table ensures accurate and efficient recording and verification of deliveries.

### Administration Functions

- **User Management:** Effortlessly manage users by adding, editing, or securely deleting accounts with password hashing for enhanced security.

- **Address Management:** Maintain control over addresses with functions to add, edit, delete, and retrieve address details.

- **Product Management:** Easily handle products by adding, editing, deleting, and retrieving items, whether by category or sorted by price.

- **Category Management:** Streamline product organization by adding, editing, or deleting product categories.

- **Cart and Wishlist Management:** Manage user preferences efficiently with functions to add, delete, and edit Cart and Wishlist data.

- **Review Management:** Ensure a curated product experience by facilitating the addition and deletion of product reviews.



## Getting Started

To set up the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/kindaAlawa/vibesk.git
cd vibesk-kindaAlawa

# Install dependencies
npm install
# Start the app
npm start  # or yarn start

