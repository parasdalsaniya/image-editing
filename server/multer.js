const multer = require('multer');
const { diskStorage } = require('multer');
const fs = require('fs');

const multerStorage = diskStorage({
    destination: (req, file, cb) => {
        console.log('Destination called');
        cb(null, "test32")
    },
    filename: (req, file, cb) => {
        console.log("Filename called");
        const ext = file.mimetype.split("/")[1];
        fs.mkdirSync('test32', { recursive: true })
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    }
})

const multerFileFilter = (req, file, cb) => {
    try {
        console.log("multerFileFilter called");
        cb(null, true)
    } catch (error) {
        console.log('error', error);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFileFilter
})

const uploadSingle = (name) => upload.single(name);
module.exports = { uploadSingle }
