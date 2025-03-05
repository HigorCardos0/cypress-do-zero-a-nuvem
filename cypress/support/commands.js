import { elements } from "../locators/elements";

Cypress.Commands.add('formPreenchido', () => {
    cy.get(elements.fields.firstNameField).type(elements.usersInfo.firstName);
    cy.get(elements.fields.lastNameField).type(elements.usersInfo.lastName);
    cy.get(elements.fields.emailField).type(elements.usersInfo.email);
    cy.get(elements.fields.textField).type(elements.usersInfo.feedback, {delay : 0});
});

Cypress.Commands.add('preenchendoForm', (fName, surname, email, feedback) => {
    cy.get(elements.fields.firstNameField).type(fName);
    cy.get(elements.fields.lastNameField).type(surname);
    cy.get(elements.fields.emailField).type(email);
    cy.get(elements.fields.textField).type(feedback, {delay : 0});
});

Cypress.Commands.add('validaDropdown', (filter) => {
    cy.get(elements.dropdown.products).select(filter);
    cy.get(elements.dropdown.products).should('have.value', filter);
});
  
Cypress.Commands.add('checkRadio', (radio) => {
    cy.get(radio).check(radio);
    cy.get(radio).should('be.checked');
});
  
