const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "Calvin Klein",
    url: "zalando.com",
    likes: 4,
  },
  {
    title: "Browser can execute only Javascript",
    author: "Hugo Boss",
    url: "hugoboss.com",
    likes: 8,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "Jack",
    url: "jack.com.vn",
    likes: 9,
  });
  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};

// the module defines the blogsInDb function
