const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, ''); 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Set the file name
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).array('images', 3); // Accept up to 3 files with the field name 'images'

// Check file type
//function check
