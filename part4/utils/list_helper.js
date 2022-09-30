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

// 4.6 mostBlogs

const mostBlogs = (blogs) => {
  let counter = {};
  for (let i = 0; i < blogs.length; i++) {
    if (counter[blogs[i].author]) {
      counter[blogs[i].author] += 1;
    } else {
      counter[blogs[i].author] = 1;
    }
  }

  const result = Object.entries(counter).reduce(function (prev, curr) {
    return prev[1] > curr[1]
      ? { author: prev[0], blogs: prev[1] }
      : { author: curr[0], blogs: curr[1] };
  });
  return result;
};

// Ex 4.7

const mostLikes = (blogs) => {
  const reducedArr = blogs.reduce((prev, blog) => {
    return prev.likes > blog.likes
      ? {
          ...prev,
          author: prev.author,
          likes: prev.likes,
        }
      : {
          ...prev,
          author: blog.author,
          likes: blog.likes,
        };
  }, {});

  return reducedArr;
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
