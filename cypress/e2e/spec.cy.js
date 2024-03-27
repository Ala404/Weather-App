describe("My First Test", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:5173");

    cy.get("input").type("الوادي");
    //check if the 1st option is the one we want
    cy.get("ul li").first().should("have.text", "الوادي, الجزائر");
    //select the first option
    cy.get("ul li").first().click();
    //check the url
    cy.url().should(
      "include",
      "/weather/الجزائر/الوادي?lat=33.37663&lng=6.86737&preview=true"
    );

    cy.get(".model").first().click();

    //save the city
    cy.get(".add-city").click();

  });


});
