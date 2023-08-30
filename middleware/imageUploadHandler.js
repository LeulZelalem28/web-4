const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
    const destinationPath = path.join(__dirname, '..', 'images');
    cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const uploadImages = multer({storage: storage}).array("images")
const uploadFeaturedImage = multer({storage: storage}).single("featuredImages")

module.exports = { uploadImages, uploadFeaturedImage}