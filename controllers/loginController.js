const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

const loginUser = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ 'message': 'email and password are required.' });
    const foundUser = await User.findOne({username}).exec() 
    if(!foundUser) return res.sendStatus(401)
    const match = await bcrypt.compare(password, foundUser.password)
    if(match){
    //const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = jwt.sign(
      // {
      //   "UserInfo": {
      //       "username": foundUser.username,
      //       "roles": roles
      //   }
      { userInfo: {
        "username":foundUser.username,
        "id": foundUser._id
      }},
      process.env.ACCESS_TOKEN_SECRET, 
      {expiresIn: "10m"})

    const refreshToken = jwt.sign(
      { userInfo: {
        "username":foundUser.username,
        "id": foundUser._id
      }},
      process.env.REFRESH_TOKEN_SECRET, 
      {expiresIn: "1d"})
    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()
    console.log(result)
    //console.log(roles)
    foundUser.save()
    res.cookie('jwt', refreshToken , {httpOnly: true, /*secure: true, sameSite: 'None',*/ maxAge: 24 * 60 * 60 * 1000})
    res.json({/*roles,*/accessToken})
  }else{
    res.sendStatus(401)
  }
}

module.exports = { loginUser }