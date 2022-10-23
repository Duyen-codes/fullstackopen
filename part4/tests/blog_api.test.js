const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
// import Express application from app.js module, the tests only use the express application defined in the app.js file
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then((result) => {
//     console.log("connected to MongoDB");
//   })

//   .catch((error) => {
//     console.log("error connecting to MongoDB:", error.message);
//   });

beforeEach(async () => {
  await Blog.deleteMany({}); // database is cleared out at the beginning
  await Blog.insertMany(helper.initialBlogs);
});

// 4.8
test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-type", /application\/json/);
}, 10000);

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");
  const titles = response.body.map((r) => r.title);
  expect(titles).toContain("Browser can execute only Javascript");
});

// 4.9
test("blog posts have id field", async () => {
  const response = await api.get("/api/blogs");
  const ids = response.body.map((r) => r.id);
  expect(ids).toBeDefined();
});

// 4.10
describe("when a new blog is created", () => {
  test("adding a blog fails with status code 401 if a token is not provided", async () => {
    const users = await helper.usersInDb();
    const newBlog = {
      title: "blog title",
      author: "test blog author",
      url: "google.com",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  test("the number of blogs is increased by 1 and blogs contain new title", async () => {
    const response = await api.post("/api/login").send({
      username: "james",
      password: "james",
    });

    const token = response.body.token;
    const users = await helper.usersInDb();
    const newBlog = {
      title: "test blog post",
      author: "tester",
      url: "youtube.com",
      user: users[2].id,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  // 4.11
  test("if likes property is missing, set default value to 0", async () => {
    const response = await api.post("/api/login").send({
      username: "james",
      password: "james",
    });

    const token = response.body.token;
    const users = await helper.usersInDb();
    const newBlog = {
      title: "no likes",
      author: "duyen",
      url: "test.fi",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[blogsAtEnd.length - 1]).toHaveProperty("likes", 0);
  });
});

// 4.12
test("title and url missing, respond status code 400", async () => {
  // user login first
  const response = await api.post("/api/login").send({
    username: "james",
    password: "james",
  });

  const token = response.body.token;
  const newBlog = {
    author: "Snellman",
    likes: 1,
  };
  // post blog
  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("succeeds with a valid id", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToView = blogsAtStart[0];
  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView));
  expect(resultBlog.body).toEqual(processedBlogToView);
});

test("fails with statuscode 404 if blog does not exist", async () => {
  const validNonexistingId = await helper.nonExistingId();
  console.log(validNonexistingId);
  await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
});

test("fails with statuscode 400 id is invalid", async () => {
  const invalidId = "62fba9b522a4a966a41c6955";
  await api.get(`/api/blogs/${invalidId}`).expect(404);
});

// delete with token
test("succeeds with status code 204 No content if id is valid", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];
  await api.get("/api/login");

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const titlesAtEnd = await helper.blogsInDb();

  expect(titlesAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const titles = titlesAtEnd.map((r) => r.content);

  expect(titles).not.toContain(blogToDelete.content);
});

afterAll(() => {
  mongoose.connection.close();
});
