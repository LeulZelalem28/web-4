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

//@desc POST create a restaurant 
//@route POST /api/restaurants
//@access public
const createRestaurant = asyncHandler(async (req, res) =>{
    const { name, description, address, contact, openingHours, category, foods } = req.body;
    const duplicate = await Restaurant.findOne({ name }).exec();
    if(duplicate) return res.status(409).json({message:"restaurant already exists"})
    if(!name || !description || !address || !foods || !foods.every(food => food.name && food.price)){
        res.status(400)
        throw new Error("Missing mandatory field")
    }
    const newRestaurant = await Restaurant.create({
        name, 
        description, 
        address, 
        contact, 
        openingHours, 
        category, 
        foods
  })
    res.status(201).json(newRestaurant)
})

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


module.exports = { getAllRestaurants, filterRestaurants, searchRestaurants, createRestaurant, updateRestaurant, deleteRestaurant, getRestaurant}