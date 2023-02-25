const User = require("./user");
const Blog = require("./blog");

Blog.sync({ alter: true });
User.sync({ alter: true });

module.exports = { Blog, User };
