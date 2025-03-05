import { elements } from "../locators/elements";

describe('Politica de privacidade', () => {
    beforeEach(() => {
      cy.visit('src/privacy.html');
    });

    it('verificando a pagina de politica de privacidade', () => {
        cy.title().should('be.equal', elements.privacyPol.pageName);
        cy.get(elements.title).should('have.text', elements.privacyPol.header);
        cy.contains('p', elements.privacyPol.tat).should('be.visible');
    });
});