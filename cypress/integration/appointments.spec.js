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

 });
 
