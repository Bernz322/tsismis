const { sign, verify } = require('jsonwebtoken')
const User = require("../models/UserModel")

/**
 * 
 * @param {Object} user 
 * @returns {String} token
 */
const createToken = (user) => {
  const accessToken = sign({ user: user.username, id: user._id }, process.env.JWT_SECRET) // Create Token using username and id
  return accessToken
}

/**
 * 
 * Middleware for validating token. Can be used on a route to protect it
 * @returns {String} middleware
 */
const validateToken = async (req, res, next) => {
  const accessToken = req.cookies["access-token"] // Get token from cookie "named access-token"

  if (!accessToken) return res.status(401).json({ message: "No token seen. Please verify yourself by logging in." });  // If token doesn't exist, return 401

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET) // Validate Cookie & decodes it. If token is valid, return true.
    
    if (validToken) {
      req.authenticated = true
      // After verification, get user from database and attach to req.user
      req.user = await User.findById(validToken.id).select("-password") // Return the data of the current logged in user without the password
      return next()   // If token is valid, continue
    } else {
      res.status(401).json({ message: "Not authorized. Please login." });
    }
  } catch (err) {
    res.status(400).json({ error: err })
    console.log(err)
  }
}

module.exports = { createToken, validateToken }