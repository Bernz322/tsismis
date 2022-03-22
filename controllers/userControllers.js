const bcrypt = require("bcrypt")

const { createToken } = require("../config/jwt")
const User = require("../models/UserModel")

/**
 * Check if all fields are filled in.
 * Check if username already exists.
 * Save User then return data and token excluding password.
 * Token saved to cookie httpOnly with 1 hour expiry
 * @param {*} req 
 * @param {*} res 
 * @returns {status, Promise}
 */
const registerUser = async (req, res) => {
    const { username, password, profileImg, about } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    if (!username || !password) return res.status(400).json({ message: "Please enter all fields." })

    const userExists = await User.findOne({ username }) // Check if username already exists

    if (userExists) {
        return res.status(400).json({ message: "Username already exist." })
    } else {
        const regNewUser = new User({
            username,
            password: hashedPassword,
            profileImg,
            about
        })

        await regNewUser.save((err) => {
            if (err) {
                res.send(err)
            } else {
                const token = createToken(regNewUser) // Create Token
                res.cookie("access-token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
                res.status(200).json({
                    _id: regNewUser._id,
                    username: regNewUser.username,
                    profileImg: regNewUser.profileImg,
                    about: regNewUser.about,
                    token
                })
            }
        })
    }
}

/**
 * Check if all fields are filled in.
 * Check if username is in the DB.
 * If user exists, check if password is correct.
 * Return user data and token excluding password.
 * Token saved to cookie httpOnly with 1 hour expiry
 * @param {*} req 
 * @param {*} res 
 * @returns {status, Promise}
 */
const loginUser = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: "Please enter all fields." })

    const userExists = await User.findOne({ username }) // Check if username exists

    if (!userExists) {
        return res.status(404).send({ message: 'Username does not exist.' })
    } else {
        if (bcrypt.compareSync(password, userExists.password)) {
            const { password, ...otherData } = userExists._doc; // Destructure and spread user data
            const token = createToken(otherData) // Create Token
            res.cookie("access-token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
            res.status(200).json({
                _id: otherData._id,
                username: otherData.username,
                profileImg: otherData.profileImg,
                about: otherData.about,
                token
            }) // Return data excluding password
        } else {
            res.status(401).json({ message: "Wrong credentials." })  // Wrong password
        }
    }
}

/**
 * Route is validated first using JWT middleware created.
 * If user is authenticated, then search for users that match the search query except the current user logged in.
 * If no query is provided, then return all users except the current user logged in.
 * @param {*} req 
 * @param {*} res 
 * @returns {Promise}
 */

const searchUser = async (req, res) => {
    const currentUserId = req.user.id // Get current logged in user id from JWT token
    /**
     * If it has query search, then create a keyword object with the search query. Otherwise, create an empty object.
     * Create a expression to search for a string that contains the query.
     * Regex is used to search for a string that contains the query and options are set to ignore case.
     * Read more: https://docs.mongodb.com/manual/reference/operator/query/regex/
     */
    const keyword = req.query.search ? { username: { $regex: req.query.search, $options: 'i' } } : {}

    /**
     * Use the created keyword object to find all users that match the search query except the current user logged in.
     * Read more: https://docs.mongodb.com/manual/reference/operator/query/ne/
     */
    const foundUsers = await User.find(keyword).find({ _id: { $ne: currentUserId } })
    res.json(foundUsers)
}

module.exports = { registerUser, loginUser, searchUser }