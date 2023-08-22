const dotenv = require('dotenv').config()
const connectDB = require("./config/dbConnection")
const express = require("express");
const { errorHandler } = require('./middleware/errorHandler');
const app = express();
const PORT = process.env.PORT || 3500;

//connect to DB
connectDB()
//to parse json data
app.use(express.json())

app.use('/api/restaurants', require('./routes/api/restaurantRoute'))
app.use('/register', require('./routes/registerRoute'))
app.use('/login', require('./routes/loginRoute'))
app.use(errorHandler);
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})