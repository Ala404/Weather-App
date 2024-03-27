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

    //save the city
    cy.get("#addCity").click();

  });

  /* ==== Test Created with Cypress Studio ==== */
  it('studio-test', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit(' http://localhost:5173/');
    cy.get('.py-2').clear('ا');
    cy.get('.py-2').type('الوادي');
    cy.get('.absolute > .py-2').click();
    cy.get('#addCity').click();
    cy.get('p.text-2xl').click();
    cy.get('.flex-1 > .fa-solid').click();
    cy.get('.p-4 > .text-white').click();
    cy.get('h3').click();
    cy.get('.cursor-pointer > p').click();
    /* ==== End Cypress Studio ==== */
  });
});
