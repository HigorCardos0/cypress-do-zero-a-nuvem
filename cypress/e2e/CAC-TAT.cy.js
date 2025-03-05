import { elements } from "../locators/elements";

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('src/index.html');
  });

  it('Verifica o titulo da pagina', () => {
    cy.title().should('contains','Central de Atendimento ao Cliente TAT');
  });
  
  Cypress._.times(3, () => {
  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock();
    cy.formPreenchido();
    cy.contains('button', 'Enviar').click();

    cy.get(elements.responses.successMsg).should('be.visible');
    
    cy.tick(3000);

    cy.get(elements.responses.successMsg).should('not.be.visible');
    });
  });

  it('Validando o Preenchimento do campo de feedback com um texto longo', () => {
    cy.clock();
    cy.formPreenchido();
    cy.get(elements.fields.textField).clear().type(elements.usersInfo.longText, {delay : 0});
    cy.get(elements.buttons.sendButton).click();

    cy.get(elements.responses.successMsg).should('be.visible');

    cy.tick(3000);

    cy.get(elements.responses.successMsg).should('not.be.visible');
  });

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock();
    cy.preenchendoForm(elements.usersInfo.firstName,
                       elements.usersInfo.lastName,
                       elements.usersInfo.emailError,
                       elements.usersInfo.feedback);

    cy.get(elements.buttons.sendButton).click();

    cy.get(elements.responses.errorMsg).should('be.visible');

    cy.tick(3000);

    cy.get(elements.responses.errorMsg).should('not.be.visible');
  });

  it('Validando se o campo de telefone aceita apenas numeros', () => {
    cy.get(elements.fields.phoneField).type(elements.usersInfo.invalidPhone);

    cy.get(elements.fields.phoneField).should('be.empty');
  });

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock();
    cy.formPreenchido();   
    cy.get(elements.checkBoxes.phoneCBox).check();
    cy.get(elements.buttons.sendButton).click();

    cy.get(elements.responses.errorMsg).should('be.visible');

    cy.tick(3000);

    cy.get(elements.responses.errorMsg).should('not.be.visible');
  });

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', ()=> {
    cy.formPreenchido();

    cy.get(elements.fields.firstNameField).clear().should('be.empty');
    cy.get(elements.fields.lastNameField).clear().should('be.empty');
    cy.get(elements.fields.emailField).clear().should('be.empty');
    cy.get(elements.fields.textField).clear().should('be.empty');
});

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',() => {
    cy.clock();
    cy.get(elements.buttons.sendButton).click();
    
    cy.get(elements.responses.errorMsg).should('be.visible');

    cy.tick(3000);

    cy.get(elements.responses.errorMsg).should('not.be.visible');
  });

  it('Seleciona um produto por seu texto na caixa de dropdown',() => {
    cy.validaDropdown('youtube');
    cy.validaDropdown('blog');
    cy.validaDropdown('cursos');
    cy.validaDropdown('mentoria');
  });

  it('Marca cada tipo de atendimento', () => {
   cy.get('input[type="radio"]').each((radioType) => {
    cy.wrap(radioType).check().should('be.checked');
   })
  });

  it('Marca ambos checkboxes, depois desmarca o último', () => {
    cy.get(elements.checkBoxes.emailCBox).check().should('be.checked');
    cy.get(elements.checkBoxes.phoneCBox).check().should('be.checked');
    cy.get(elements.checkBoxes.phoneCBox).uncheck().should('not.be.checked');
  });

  it('Verifica o upload de arquivos', () => {
    cy.get(elements.buttons.fileUpload)
    .selectFile('cypress/fixtures/example.json')
    .should((input) => {
      expect(input[0].files[0].name).to.be.equal('example.json');
  });

    it('Seleciona um arquivo simulando um drag-and-drop', ()=> {
      cy.get(elements.buttons.fileUpload)
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should((input) => {
        expect(input[0].files[0].name).to.be.equal('example.json');
      });
    });
  });

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture("example.json").as('exempleFile')
    cy.get(elements.buttons.fileUpload)
    .selectFile('@exempleFile')
    .should((input) => {
      expect(input[0].files[0].name).to.be.equal('example.json');
    });
  });

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',() => {
    cy.contains('a', 'Política de Privacidade').should('have.attr', 'href', 'privacy.html').and('have.attr', 'target', '_blank');
  });

  it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click();
    cy.get(elements.privacyPol.title).should('have.text', elements.privacyPol.header);
  });

  it('Exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get(elements.responses.successMsg)
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get(elements.responses.errorMsg)
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  });

  it('Preenche o campo da área de texto usando o comando invoke', () => {
    cy.get(elements.fields.textField).invoke('val', elements.usersInfo.feedback)
    .should('have.value',elements.usersInfo.feedback);
  });

  it('Faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
    .as('getRequest')
    .its('status')
    .should('be.equal', 200)
    cy.get('@getRequest')
    .its('statusText')
    .should('be.equal', 'OK')
    cy.get('@getRequest')
    .its('body')
    .should('include', 'CAC TAT');
  });

  it.only('Achando o gato escondido e mudando o nome da aplicação', () => {
    cy.get('#cat').invoke('show').should('be.visible');
    cy.get(elements.title).invoke('text', 'CAT TAT');
  });
});
