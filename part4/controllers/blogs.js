const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user');
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    // user info is added to the user field of note objects 
    response.status(200).json(blogs)
    })

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
    .then(blog => {
        if(blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    })
})


blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    // the validity of the token is checked with jwt.verify method. The method also decodes the token, returns an object which contains username and id fields. 
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const decodedToken = request.user;

    if(!decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    // const user = await User.findById(body.userId)
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    // blog.save()
    // .then(savedBlog => {
    //    response.status(201).json(savedBlog)
    // })
    // .catch(error => next(error))
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id) // the id of the note is stored in the notes field
    await user.save()
    response.status(201).json(savedBlog)
})

// delete blog 
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
   const user = request.user;
    if(!user.id) {
        response.status(401).json({
            error: 'Token missing or invalid'
        })
    }
  
    const userid = user.id;
    const blog = await Blog.findById(request.params.id);
    // since blog.user is an Object, so if you wanna compare the id of the object fetched from the database and a string id, the id fetched from the database must be parsed into a string first
 if(blog.user.toString() === userid.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
       response.status(204).end()
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    
    const blog  = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(updatedBlog)
})


module.exports = blogsRouter