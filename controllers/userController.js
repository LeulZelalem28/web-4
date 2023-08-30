const User = require('../model/userModel')
const getUsers = async (req, res) =>{
    const users = await User.find()
    res.status(200).json(users)
}
const getUser = async (req, res) => {
    const { username } = req.params;
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
  const putUser = async (req, res) => {
    const { username } = req.params;
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { username },
        req.body,
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  const deleteUsers = async (req, res) => {
    const { username } = req.params;
  
    try {
      const deletedUser = await User.findOneAndDelete({ username });
  
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json({ message: `User ${deletedUser.username} deleted successfully` });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
module.exports = { getUsers, getUser, putUser, deleteUsers}

