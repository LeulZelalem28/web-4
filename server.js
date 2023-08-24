require('dotenv').config()
const connectDB = require("./config/dbConnection")
const express = require("express");
const cookieParser = require('cookie-parser')
const { errorHandler } = require('./middleware/errorHandler');
const { verifyJWT } = require('./middleware/verifyJWT');
const app = express();
const PORT = process.env.PORT || 3500;

//connect to DB
connectDB()
//Cross Origin Resource Sharing

//built-in middleware to handle url encoded form data
app.use(express.urlencoded({ extended: false }))
//to parse json data
app.use(express.json())
//middleware for cookies
app.use(cookieParser())

app.use('/register', require('./routes/registerRoute'))
app.use('/login', require('./routes/loginRoute'))
app.use('/refresh', require('./routes/refreshRoute'))
app.use('/logout', require('./routes/logoutRoute'))
// app.use(verifyJWT)
app.use('/api/restaurants', require('./routes/api/restaurantRoute'))
app.use('/api/reviews', require('./routes/api/reviewRoute'))

app.use(errorHandler);
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})