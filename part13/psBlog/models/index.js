const User = require("./user");
const Blog = require("./blog");

User.hasMany(Blog);
Blog.belongsTo(User);
Blog.sync({ alter: true });
User.sync({ alter: true });

module.exports = { Blog, User };
