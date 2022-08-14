require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')


loginRouter.post('/', async(request, response) => {
    const {username, password} = request.body

    // search for the user from the database by the username attached to the request. 
    const user = await User.findOne({username})

    // check the password attached to the request
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    // if user is not found or password is incorrect, request is responded to with status code 401 unauthorized
    if(!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    // if password is correct, a token is created with the method jwt.sign
    const userForToken= {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: "2 days"})

    // successful request is responded with status code 200 OK, generated token and username of the user are sent back in the response body. 
    response.status(200)
            .send({token, username: user.username, name: user.name})
})

module.exports = loginRouter

// a successful login returns the user details and the token:

// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphbWVzIiwiaWQiOiI2MmY4YzdjY2I1MzExNjk3NzBlMTcxYjUiLCJpYXQiOjE2NjA0NzE3ODd9.PpoETT1ekLUSNDHmJmP_RdzBvSoXmSwo6kxTRJr_alo",
//     "username": "james",
//     "name": "james"
// }