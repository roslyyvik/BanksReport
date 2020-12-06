const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    image: {
        path: { type: String, default: '/images/image.png' },
        filename: String
    },
    avatar: {
        type: String,
        default: '/images/image.png'
    },
    cloudinary_id: {
        type: String
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date
})

UserSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', UserSchema)