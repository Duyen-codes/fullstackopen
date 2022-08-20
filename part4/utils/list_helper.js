// define a dummy function that receives an array of blog posts as a parameter and always returns the value 1.
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => {
        if (!blog.likes) return 0;
        return sum + blog.likes;
      }, 0);
};

// 4.5
const favoriteBlog = (blogs) => {
  const mostLikedBlog = blogs.reduce(function (prev, current) {
    return prev.likes > current.likes ? prev : current;
  }, 0);
  const { title, author, likes } = mostLikedBlog;
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  // authors array
  const authors = blogs.map((blog) => blog.author);
};

const mostLikes = (blogs) => {};
// 4.6 mostBlogs

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
