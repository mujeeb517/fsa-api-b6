const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productCtrl');

// api/products
router.get('/', productCtrl.get);
// api/products/:id
router.get('/:id', productCtrl.getById);
router.post('/', productCtrl.create);
router.delete('/:id', productCtrl.remove);
router.put('/:id', productCtrl.update);
router.patch('/:id', productCtrl.patch);

module.exports = router;

// step1: ctrl
// step2: routes
// step3: register router