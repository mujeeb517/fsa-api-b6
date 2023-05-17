const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productCtrl');

router.get('/', productCtrl.get);
router.get('/page/:page/limit/:limit', productCtrl.get);
router.get('/:id', productCtrl.getById);

router.post('/', productCtrl.post);

router.delete('/:id', productCtrl.remove);

router.put('/:id', productCtrl.update);
router.patch('/:id', productCtrl.patch);

module.exports = router;

