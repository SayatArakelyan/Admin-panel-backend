const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(__dirname + '/../_uploads')) {
            fs.mkdirSync(__dirname + '/../_uploads');
        }
        if (!fs.existsSync(__dirname + '/../_uploads/products')) {
            fs.mkdirSync(__dirname + '/../_uploads/products');
        }
        if (req.method === 'POST') {
            cb(null, __dirname + '/../_uploads/products')
        }
    },
    filename: function (req, file, cb) {
        if (req.method === 'POST') {
            cb(null, new Date().getTime().toString() + file.originalname)
        }
    }
});

let fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    fileFilter: fileFilter,
    storage: storage
});

module.exports = upload;
