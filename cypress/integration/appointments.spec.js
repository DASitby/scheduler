describe("Appointment", () => {
  it("should book an interview", () => {
    //Navigate to root
    cy.visit("/");
    cy.contains("Monday");
    //Click Add button
    cy.get("[alt=Add]").first().click();
    //Enter their name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    //Select an interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    //Click save
    cy.contains("Save").click();
    //Reset database when done
    cy.request("GET", "/api/debug/reset")
  });
  
});
