const asyncHandler = require('express-async-handler')
const Restaurant = require("../model/restaurantModel")

//@desc GET all restaurants
//@route GET /api/restaurants
//@access public
const getAllRestaurants = asyncHandler(async (req, res) =>{
    const restautrants = await Restaurant.find()
    res.status(200).json(restautrants)
})

//@desc get restaurants by address and category filter
//@route POST /api/restaurants/filter
//@access public
const filterRestaurants = asyncHandler(async (req, res) =>{
    const { address, category } = req.body
    let filter = {};
    if(address) {
        filter.address = address
    }
    if(category) {
        filter.category = category
    }
    const filteredRestautrants = await Restaurant.find({filter})
    res.status(200).json(filteredRestautrants)
})

//@desc search restaurants
//@route POST /api/restaurants/search
//@access public
const searchRestaurants = asyncHandler(async (req, res) =>{
    const {query} = req.query;
    if(!query) {
        res.status(400)
        throw new Error("Please enter a search query.")
    }
    const searchQuery = await Restaurant.find({name:{$regex: query, $options: 'i'}})
    res.status(200).json(searchQuery)
})
// const createRestaurant = asyncHandler(async (req, res) => {

//     const { name, description, address, contact, openingHours, category, foods } = req.body;
  
//     // let images = [];
//     // let featuredImage = null;
  
//     // Validate mandatory fields
 
//     if( !name || !description || !address || !foods || !foods.every(food => food.name && food.price)){
//         res.status(400)
//         throw new Error("Missing mandatory field")
//     }
//     // // Handle images if provided
//     // if(req.files) {
  
//     //   try {
//     //     images = req.files.map(file => file.path);
//     //   } catch (error) {
//     //     res.status(400);
//     //     throw new Error("Error processing images");
//     //   }
  
//     // }
  
//     // if(req.file) {
//     //   try {  
//     //     featuredImage = req.file.path;
//     //   } catch (error) {
//     //     res.status(400);
//     //     throw new Error("Error processing featured image");
//     //   }
//     // }
  
//     const duplicate = await Restaurant.findOne({name});
//     if(duplicate) return res.status(409).json({message: "Restaurant exists"});
  
//     let newRestaurant;
  
//     try {
  
//       newRestaurant = await Restaurant.create({
//         name,
//         description,
//         address,
//         contact, 
//         openingHours,
//         category,
//         foods,
//         // images,
//         // featuredImage
//       });
  
//     } catch (error) {
//       res.status(500);
//       throw new Error("Error saving restaurant");
//     }
  
//     res.status(201).json(newRestaurant);
  
//   })
//@desc POST create a restaurant 
//@route POST /api/restaurants
//@access public
// const createRestaurant = asyncHandler(async (req, res) =>{
//     const { name, description, address, contact, openingHours, category, foods } = req.body;
//     // // const images = req.files.map((file) => file.path);
//     // // const featuredImages = req.file.path;
//     // console.log("hi")
//     // let images = [];
//     // let featuredImages = null;
  
//     // if (req.files) {
//     //   images = req.files.map((file) => file.path);
//     // }
  
//     // if (req.file) {
//     //   featuredImages = req.file.path;
//     // }
//     const duplicate = await Restaurant.findOne({ name }).exec();
//     if(duplicate) return res.status(409).json({message:"restaurant already exists"})
//      // Check if the images field is empty

//     if( !name || !description || !address || !foods || !foods.every(food => food.name && food.price)){
//         res.status(400)
//         throw new Error("Missing mandatory field")
//     }
//     const newRestaurant = await Restaurant.create({
//         name, 
//         description, 
//         address, 
//         contact, 
//         openingHours, 
//         category, 
//         foods,
//         // images,
//         // featuredImages,
//   })
//   console.log(newRestaurant)
//     res.status(201).json(newRestaurant)
// })

// restaurantController.js

const createRestaurant = asyncHandler(async (req, res) => {
  const { name, description, address, contact, openingHours, category, foods } = req.body;
  let featuredImages = null;
  // Validate mandatory fields
  console.log(req.file)
  if (!name || !description || !address || !foods || !foods.every((food) => food.name && food.price)) {
    res.status(400);
    throw new Error("Missing mandatory field");
  }

const duplicate = await Restaurant.findOne({ name }).exec();
  if (duplicate) {
    return res.status(409).json({ message: "Restaurant already exists" });
  }
  // Handle featured image upload
  
  if (req.file) {
    featuredImages = req.file.path;
  }

const newRestaurant = await Restaurant.create({
    name,
    description,
    address,
    contact,
    openingHours,
    category,
    foods,
    featuredImages: featuredImages,
  });

  console.log(newRestaurant);
  res.status(201).json(newRestaurant);
});

// const createRestaurant = asyncHandler(async (req, res) => {
//   const { name, description, address, contact, openingHours, category, foods } = req.body;

//   // Validate mandatory fields
//   if (!name || !description || !address || !foods || !foods.every((food) => food.name && food.price)) {
//     res.status(400);
//     throw new Error("Missing mandatory field");
//   }

//   const duplicate = await Restaurant.findOne({ name }).exec();
//   if (duplicate) {
//     return res.status(409).json({ message: "Restaurant already exists" });
//   }

//   const newRestaurant = await Restaurant.create({
//     name,
//     description,
//     address,
//     contact,
//     openingHours,
//     category,
//     foods,
//   });

//   console.log(newRestaurant);
//   res.status(201).json(newRestaurant);
// });
const addImagesToRestaurant = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    }
  });

  const upload = multer({ storage });
  
  const uploadImages = upload.array("images");
  const uploadFeaturedImage = upload.single("featuredImages", {
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'images'));
      },
    }),
  });

  uploadImages(req, res, async (err) => {
    if (err) {
      // Handle any upload errors
      console.error(err);
      return res.status(500).json({ message: "Image upload failed" });
    }

    uploadFeaturedImage(req, res, async (err) => {
      if (err) {
        // Handle any upload errors
        console.error(err);
        return res.status(500).json({ message: "Featured image upload failed" });
      }

      const { files } = req;
      const images = files.map((file) => file.path);
      const featuredImage = req.file.path;

      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }

      restaurant.images = images;
      restaurant.featuredImages = featuredImage;

      const updatedRestaurant = await restaurant.save();
      console.log(updatedRestaurant);
      res.status(200).json(updatedRestaurant);
    });
  });
});

// const addImagesToRestaurant = asyncHandler(async (req, res) => {
//   const { restaurantId } = req.params;
//   const { images, featuredImage } = uploadImages(req);

//   const restaurant = await Restaurant.findById(restaurantId);
//   if (!restaurant) {
//     return res.status(404).json({ message: "Restaurant not found" });
//   }

//   restaurant.images = images;
//   restaurant.featuredImage = featuredImage;

//   const updatedRestaurant = await restaurant.save();
//   console.log(updatedRestaurant);
//   res.status(200).json(updatedRestaurant);
// });

//@desc  update a restaurant
//@route PUT /api/restaurants/:id
//@access public
const updateRestaurant = asyncHandler(async (req, res) =>{
    const restaurantId = req.params.id;
    if(!restaurantId){
        res.status(400)
        throw new Error('ID parameter is required.')
    }
    const restaurant = await Restaurant.findOne({_id: restaurantId})
    if(!restaurant){
        return res.status(204).json({ "message": `No restaurant matches ID ${req.params.id}.` });
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedRestaurant)
})

//@desc delete a restaurant
//@route DELETE /api/restaurants/:id
//@access public
const deleteRestaurant = asyncHandler(async (req, res) =>{
    const restaurantId = req.params.id;
    if(!restaurantId){
        res.status(400)
        throw new Error('ID parameter is required.')
    }
    const restaurant = await Restaurant.findOne({_id: restaurantId})
    if(!restaurant){
        return res.status(204).json({ "message": `No restaurant matches ID ${req.params.id}.` });
    }
    const deletedRestaurant = await Restaurant.deleteOne({_id: restaurantId})
    res.status(200).json({message: "delete restaurant"})
})

//@desc GET a single restaurant
//@route GET /api/restaurants/:id
//@access public
const getRestaurant = asyncHandler(async (req, res) =>{
    const restaurantId = req.params.id;
    if(!restaurantId){
        res.status(400)
        throw new Error('ID parameter is required.')
    }
    const restaurant = await Restaurant.findOne({_id: restaurantId})
    if(!restaurant){
        res.status(404)
        throw new Error(`No erestaurant matches ID ${req.params.id}.`)
    }
    res.status(200).json(restaurant)
})


module.exports = { addImagesToRestaurant, getAllRestaurants, filterRestaurants, searchRestaurants, createRestaurant, updateRestaurant, deleteRestaurant, getRestaurant}