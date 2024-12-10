const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName : { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    bio: { type: String, required: true }
},  { timestamps: true }); //Added time stamp for data creation and when the document was last updated.


const User = mongoose.model('User', userSchema);

module.exports = User;