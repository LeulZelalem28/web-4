// const multer = require('multer');
// const path = require('path');
// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//     const destinationPath = path.join(__dirname, '..', 'images');
//     cb(null, destinationPath);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname)
//     }
// })

// const uploadImages = multer({storage: storage}).array("images")
// const uploadFeaturedImage = multer({storage: storage}).single("featuredImages")

// module.exports = { uploadImages, uploadFeaturedImage}
const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination:(req, file,cb)=>{
    cb(null,'images')
    },
    filename:(req,file,cb)=>{
        console.log(file)
        cb(null,Date.now()+ path.extname(file.originalname) )
    }
})
const upload= multer({storage: storage,  limits: {
    fileSize: 1024 * 1024 * 10 }})

module.exports = {upload}