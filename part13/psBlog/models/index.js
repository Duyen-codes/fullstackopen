const User = require("./user");
const Blog = require("./blog");
const ReadingList = require("./readinglist");
const Session = require("./session");

// User.hasMany(Blog);
// Blog.belongsTo(User);

Blog.belongsToMany(User, { through: ReadingList });
User.belongsToMany(Blog, { through: ReadingList, as: "readings" });

// Blog.sync({ alter: true });
// User.sync({ alter: true });

module.exports = { Blog, User, ReadingList, Session };
