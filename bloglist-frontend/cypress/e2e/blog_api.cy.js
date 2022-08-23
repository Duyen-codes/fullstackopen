describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("front page can be opened", function () {
    cy.contains("Blogs");
    cy.contains("HTML is easy");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.get("input:first").type("hellas");
    cy.get("input:last").type("hellas");
  });
});
