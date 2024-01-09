const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage(
    { // options
        destination: (req, file, cb) => {
            cb(null, "./uploads/tmp")
        },
        filename: (req, file, cb) => {
            const originalFilename = path.parse(file.originalname).name; // Extract the original filename without extension
            const fileExtension = path.extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + uniqueSuffix + fileExtension)
        }
    }
)
const upload = multer({storage})

module.exports = upload;