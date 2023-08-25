const User = require('../model/userModel')

const getUsers = async (req, res) =>{
    const users = await User.find()
    res.status(200).json(users)
}
const putUser = async (req, res) =>{
    const user_id = req.params.id
    const updatedUser = await User.findByIdAndUpdate(user_id, req.body, {
        new: true,
      });
    if(!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser)
}
const deleteUsers = async (req, res) =>{
    const user_id = req.params.id
    const deletedUser = await User.findByIdAndDelete(user_id);
    if(!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({message: `User ${deletedUser.name} deleted successfully` })
}

module.exports = { getUsers, putUser, deleteUsers}

