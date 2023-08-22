const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

const loginUser = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ 'message': 'email and password are required.' });
    const foundUser = await User.find({email}) 
    if(!foundUser) return sendStatus(400).json({message:" Invalid Credentials"})
    const match = await bcrypt.compare(password, foundUser.password)
    if(!match){
    const accessToken = jwt.sign({"username":foundUser.username},process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10m"})
    res.json({accessToken})
    const refreshToken = jwt.sign({"username":foundUser.username},process.env.REFRESH_TOKEN_SECRET, {expiresIn: "1d"})
         // Saving refreshToken with current user
         foundUser.refreshToken = refreshToken;
         const result = await foundUser.save();
         console.log(result);
         console.log(roles);
 
         // Creates Secure Cookie with refresh token
         res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
 
         // Send authorization roles and access token to user
         res.json({ roles, accessToken });
    }
      else {
        sendStatus(403).json({message: "Password does not match"})
     }
    }


module.exports = { loginUser }