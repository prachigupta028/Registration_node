const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    username : {
        type: String,
        required: true,
        unique: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    phone : {
        type: String,
        required: true,
    },
    state : {
        type: String,
    },
    country : {
        type: String,
    },
    college : {
        type: String,
    },
    profile : {
        data: Buffer,
        contentType: String
    },
    emailAuthenticated : {
        type: Boolean,
    }
})

module.exports = mongoose.model("users", UserSchema);