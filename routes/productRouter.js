const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productCtrl');

router.get('/', productCtrl.get);
router.get('/:id', productCtrl.getById);

router.post('/', productCtrl.post);

module.exports = router;