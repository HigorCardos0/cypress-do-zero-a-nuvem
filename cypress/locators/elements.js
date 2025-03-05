export const elements = {

    fields: {
        firstNameField: '#firstName',
        lastNameField: '#lastName',
        emailField: '#email',
        textField: '#open-text-area',
        phoneField: '#phone'
    },

    usersInfo: {
        firstName: 'Higor',
        lastName: 'Cardoso',
        email: 'brohigor@gmail.com',
        emailError: 'brohigorgmail.com',
        feedback: 'It is so good',
        longText: Cypress._.repeat('This game is alot of fun with friends, can be frustrating at times, but is well developed and alot of fun.', 8),
        invalidPhone: 'nine nine one',
        phoneNumber: '14 997390001'
    },

    checkBoxes: {
        phoneCBox: '#phone-checkbox',
        emailCBox: '#email-checkbox'
    },

    buttons: {
        sendButton: 'button[type=submit]',
        fileUpload: '#file-upload',
        helpRadio: 'input[type="radio"][value="ajuda"]',
        praiseRadio: 'input[type="radio"][value="elogio"]',
        feedbackRadio: 'input[type="radio"][value="feedback"]',
        checkbox: 'input["type=checkbox"'
    },

    responses: {
        successMsg: '.success',
        errorMsg: '.error'
    },

    dropdown: {
        products: '#product'
    },

    privacyPol: {
        title: '#title',
        header: 'CAC TAT - Política de Privacidade',
        pageName: 'Central de Atendimento ao Cliente TAT - Política de Privacidade',
        tat: 'Talking About Testing'
    }
};