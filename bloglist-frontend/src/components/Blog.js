import React, { useState } from "react";

const Blog = ({ blog, updateLikes, handleDeleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleAddLikes = (blog) => {
    const addedLikesObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
    };
    const id = blog.id;
    updateLikes(addedLikesObject, id);
  };

  const removeClick = (blog) => {
    const toBeRemovedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
    };
    const id = blog.id;
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      handleDeleteBlog(toBeRemovedBlog, id);
    } else {
      return;
    }
  };

  return (
    <div style={blogStyle}>
      <p>
        {" "}
        {blog.title}{" "}
        <button onClick={() => setVisible(!visible)}>
          {visible ? "hide" : "view"}
        </button>
      </p>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            {" "}
            likes
            {blog.likes}{" "}
            <button onClick={() => handleAddLikes(blog)}>like</button>
          </p>
          <p>{blog.author}</p>
          <button onClick={() => removeClick(blog)}>remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
