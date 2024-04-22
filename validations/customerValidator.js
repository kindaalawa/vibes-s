const { check } = require('express-validator');

const insertCustomerValidation = [
    check('customer_Email').notEmpty().withMessage('Email is required'),
    check('customer_Email').isEmail().withMessage('Invalid Email Format'),
    check('customer_Password').notEmpty().withMessage('Password is required'),
    check('customer_Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('customer_Password').isStrongPassword().withMessage("You entered a weak pwd"),
    check('customer_FullName').notEmpty().withMessage('Full Name is required'),
    check('customer_PhoneNumber').notEmpty().withMessage('Phone Number is required'),
  ];
  
  const updateCustomerValidation = [
    check('customer_ID').notEmpty().withMessage('CustomerId is required'),  
    check('customer_Email').notEmpty().withMessage('Email is required'),
    check('customer_Email').isEmail().withMessage('Invalid Email Format'),
    check('customer_Password').notEmpty().withMessage('Password is required'),
    check('customer_Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('customer_Password').isStrongPassword().withMessage("You entered a weak pwd"),
    check('customer_FullName').notEmpty().withMessage('Full Name is required'),
    check('customer_PhoneNumber').notEmpty().withMessage('Phone Number is required'), 
];
  
  module.exports = {
    insertCustomerValidation,
    updateCustomerValidation,
  };