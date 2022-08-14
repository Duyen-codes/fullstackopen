const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
// import Express application from app.js module, the tests only use the express application defined in the app.js file
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
})
    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)
}, 100000)

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length)
})

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(titles).toContain('Browser can execute only Javascript')
})


}, 100000)


describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

        expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        console.log(validNonexistingId)

        await api  
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })
}, 100000)

// delete

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api   
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        
        const titlesAtEnd = await helper.blogsInDb()
        
        expect(titlesAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = titlesAtEnd.map(r => r.content)

        expect(titles).not.toContain(blogToDelete.content)
    })
}, 100000)

afterAll(() => {
    mongoose.connection.close()
})