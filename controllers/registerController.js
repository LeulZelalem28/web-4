const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) return res.status(400).json({ 'message': 'Username and password are required.' }); 
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await User.create({
            username,
            email,
            password: hashedPassword
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

 

module.exports = {registerUser}