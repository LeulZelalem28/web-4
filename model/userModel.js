const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    roles: {
        User: {
            type: String,
            default: "User"
        },
        Editor: String,
        Admin: String
    },
    refreshToken: String
    
})

module.exports = mongoose.model("User", userSchema)