const { User } = require("../../part13a/models");
const Blog = require("./blog")

Blog.sync()
User.sync()

module.exports = { Blog }
