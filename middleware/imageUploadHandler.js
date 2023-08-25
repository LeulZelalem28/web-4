const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, '../images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const uploadImages = multer({storage: storage}).array("images")
const uploadFeaturedImage = multer({storage: storage}).single("featuredImages")

module.exports = { uploadImages, uploadFeaturedImage}