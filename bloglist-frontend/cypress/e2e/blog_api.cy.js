describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Arto Hellas",
      username: "hellas",
      password: "hellas",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("login form is shown by default", function () {
    cy.contains("log in");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  // 5.18 tests for loggin in
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("hellas");
      cy.get("#password").type("hellas");
      cy.get("#login-button").click();
      cy.contains("success");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("hellas");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.contains("Wrong username or password");
      cy.get(".notification")
        .should("have.css", "color", "red")
        .and("have.css", "  border", "2px solid red");
    });
  });

  // 5.19 logged-in user can create a new blog
  describe("When logged in", function () {
    beforeEach(function () {
      // log in user here
      cy.login({ username: "hellas", password: "hellas" });
      cy.createBlog({
        title: "first blog",
        author: "first blog author",
        url: "www.firstblog.com",
        likes: 0,
      });
      cy.createBlog({
        title: "blog2",
        author: "author 2",
        url: "url 2",
        likes: 1,
      });
      cy.createBlog({
        title: "blog3",
        author: "author 3",
        url: "url 3",
        likes: 2,
      });
    });

    it("a new blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("input.title").type("a blog created by cypress");
      cy.contains("save").click();

      cy.get(".notification")
        .should("have.css", "color", "green")
        .contains("New blog created");
      cy.contains("a blog created by cypress");
    });
    // 5.20
    it("users can like a blog", function () {
      cy.contains("view").click();
      cy.contains("like").click();
    });

    // 5.21
    it("user who created a blog can delete it", function () {
      cy.contains("first blog").contains("view").click();
      cy.contains("first blog").contains("remove").click();
      cy.get(".blogs").should("not.contain", "first blog");
    });

    // bonus exercise: other users cannot delete the blog.
    it("other users cannot delete the blog", function () {
      cy.contains("logout").click();
      cy.contains("HTML is easy").contains("view").click();
      cy.contains("HTML is easy").contains("remove").click();
      cy.get(".blogs").should("contain", "HTML is easy");
    });

    // 5.22
    it("blogs are sorted by most likes", function () {
      cy.get(".blogs").each(function (blog) {
        cy.get(".blog").contains("view").click();
      });
      cy.get(".blog").eq(0).should("contain", "blog3");
    });
  });
});
