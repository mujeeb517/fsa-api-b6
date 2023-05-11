const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productCtrl');

router.get('/products', productCtrl.get);
router.get('/products/:id', productCtrl.getById);

module.exports = router;

// step1: ctrl
// step2: routes
// step3: register router