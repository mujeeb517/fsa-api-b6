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

module.exports = upload;