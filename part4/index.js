// the environment variables defined in the .env file taken into use with the expression below
require('dotenv').config()

const express = require('express');
const app = express()


// http is a Node's built-in web server module
const http = require('http'); // import http 


// import Person module 
const Blog = require('./models/blog')


// createServer method of http module to create a new web/http server, assigned to app variable

app.use(express.json()) // without it request.body is undefined

app.get('/',(request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/api/blogs', (request, response) => {
    Blog.find({}).then(blogs => {
        response.status(200).json(blogs)
    })
})

app.post('/api/blogs', (request, response, next) => {
    const body = request.body
    console.log(body)
    if(body.title === undefined) {
        return response.status(400).json({error: 'title missing'})
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog.save()
    .then(savedBlog => {
        response.status(201).json(savedBlog.toJSON())
    })
    .catch(error => next(error))
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})