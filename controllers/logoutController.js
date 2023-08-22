const User = require('../model/userModel')

const logoutUser = async (req, res) =>{
    // On client delete access token
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204) //no content
    const refreshToken = cookies.jwt
    const foundUser = await User.findOne({refreshToken}).exec()
    if(!foundUser){ 
        res.clearCookie('jwt', {httpOnly: true, /*secure: true,*/ sameSite: 'None', maxAge: 24 * 60 * 60 * 1000})
        return res.sendStatus(204)
    }
    //Delete refreshToken from Database
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', /*secure: true,*/maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204);
    
}

module.exports = {logoutUser}