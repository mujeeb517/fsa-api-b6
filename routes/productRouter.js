const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productCtrl');
const reviewCtrl = require('../controllers/reviewCtrl');
const authUtils = require('../utils/authUtils');

router.get('/', productCtrl.get);
router.get('/page/:page/limit/:limit', productCtrl.get);
router.get('/:id', productCtrl.getById);

router.post('/', productCtrl.post);

router.delete('/:id', authUtils.authorizeAdmin, productCtrl.remove);

router.put('/:id', productCtrl.update);
router.patch('/:id', productCtrl.patch);

router.post('/:id/reviews', reviewCtrl.post);

module.exports = router;
