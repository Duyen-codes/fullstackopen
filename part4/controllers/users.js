// define a separate router for dealing with users
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {

    // Mongoose join is done with populate method. populate method is chained after the find method
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    console.log(users)
    // response.json(users.map(user => user.toJSON()))
    response.json(users)
 })

// implement a route for creating new users by doing a HTTP POST request to address api/users
usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    const existingUser = await User.findOne({username})
    if(existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    } else if (username.length <3 || password.length <3 ) {
        return response.status(400).json({
            error: "username and password must be at least 3 characters long"
        })
    }

    const saltRounds = 10
    // password sent in the request is NOT stored in database, we store the hash of the password that is generated with bcrypt.hash function

    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Users have a username, a name and a passwordHash
    const user = new User({
        username,
        name,
        passwordHash,
      })
    
    const savedUser = await user.save()

    response.status(201).json(savedUser)
 })



module.exports = usersRouter


