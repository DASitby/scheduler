describe("Appointments", () => {
  beforeEach(() => {
   cy.request("GET", "/api/debug/reset");
   cy.visit("/");
   cy.contains("Monday");
  });
 
  it("should book an interview", () => {
  //Click the add button
    cy.get("[alt=Add]").first().click();
  //Enter name and select interviewer
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get('[alt="Sylvia Palmer"]').click();
  //Click Save
    cy.contains("Save").click();
  //Check that the appointment is booked
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    //Click the edit button
      cy.get("[alt=Edit]").first().invoke('show').click();
    //Select new interviewer
      cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");      ;
      cy.get('[alt="Tori Malcolm"]').click();
    //Click Save
      cy.contains("Save").click();
    //Check that the appointment is booked
      cy.contains(".appointment__card--show", "Lydia Miller-Jones");
      cy.contains(".appointment__card--show", "Tori Malcolm");
    });

    it("should cancel an interview", () => {
      //Click the delete button
      cy.get("[alt=Delete]")
        .click({ force: true });
      //Click the confirm button
      cy.contains("Confirm").click();
      //Check the Deleting message appears and then disappears
      cy.contains("Deleting").should("exist");
      cy.contains("Deleting").should("not.exist");
      //Check that the appointment card is indeed gone
      cy.contains(".appointment__card--show", "Archie Cohen")
        .should("not.exist");
    });
    
 });
 
