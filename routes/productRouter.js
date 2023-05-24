const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productCtrl');
const reviewCtrl = require('../controllers/reviewCtrl');
const authUtils = require('../utils/authUtils');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname;
        req.body.image = filename;
        cb(null, filename);
    },
});

const upload = multer({
    storage: storage
});

router.get('/', productCtrl.get);
router.get('/page/:page/limit/:limit', productCtrl.get);
router.get('/:id', productCtrl.getById);

router.post('/', upload.single('image'), productCtrl.post);

router.delete('/:id', authUtils.authorizeAdmin, productCtrl.remove);

router.put('/:id', productCtrl.update);
router.patch('/:id', productCtrl.patch);

router.post('/:id/reviews', reviewCtrl.post);

module.exports = router;
