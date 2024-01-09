const upload = require('./file-upload');

const path = require('path')
const CustomApiError = require('../errors');

upload.fileFilter = (req, file, cb) => {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (!acceptedImageTypes.includes(file.mimetype) || !extname) {
        return cb( new CustomApiError.BadRequestError('Only Image files are allowed') );
    }

    return cb(null, true);
}

module.exports = upload