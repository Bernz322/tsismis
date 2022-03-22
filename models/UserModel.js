const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImg: {
        type: String,
        default: "https://freesvg.org/img/abstract-user-flat-1.png",
    },
    about: {
        type: String,
        default: "Another Tsismosa"
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema)

/**
 * users and groupAdmin values are referenced from User model
 * latestMessage value is referenced from Message model
 */