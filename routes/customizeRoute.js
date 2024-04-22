const express = require('express');
const {
    getAllCustomizeController,
    getCustomizeByIdController,
    getCustomizeByProductController,
    insertCustomizeController,
    updateCustomizeController,
    deleteCustomizeController,
} = require('../controllers/customizeController');

const {
    insertCustomizeValidation,
    updateCustomizeValidation,
} = require('../validations/customizeValidator');

const router = express.Router();

router.get('/customizations', getAllCustomizeController);
router.post('/customize', getCustomizeByIdController);
router.post('/customizeByProduct', getCustomizeByProductController);
router.post('/newCustomization', insertCustomizeValidation, insertCustomizeController);
router.put('/customize', updateCustomizeValidation, updateCustomizeController);
router.delete('/customize', deleteCustomizeController);

module.exports = router;
