describe('Verificar mi aplicacion', () => {
    it('verificar login con credenciales incorrectas', () => {
      cy.visit('localhost:8100').then(() => {
        cy.wait(1500);
        cy.get('#correo').invoke('val','correo-inexistente@duocuc.cl');
        cy.wait(1500);
        cy.get('#password').invoke('val','1234');
        cy.wait(1500);
        cy.contains('Ingresar').click();
        cy.wait(1500);
      });
    });
  
    it('verificar login con credenciales correctas', () => {
      cy.wait(1500);
      cy.visit('localhost:8100').then(() => {
        cy.wait(1500);
        cy.get('#correo').type('atorres@duocuc.cl'), {delay: 100}
        cy.wait(1500);
        cy.get('#password').type('1234'),{delay: 100}
        cy.wait(1500);
        cy.contains('Ingresar').click();
        cy.intercept('/inicio').as('route').then(() => {
          cy.wait(1500);
          cy.get('#saludo').should('contain.text','¡Bienvenido(a) Ana Torres!')
          cy.wait(1500);
          cy.get('#boton-salir').click();
        });
      });
    });
  
  
    it('verificar agregar publicacion', () => {
      cy.wait(1500);
      cy.visit('localhost:8100').then(() => {
        cy.wait(1500);
        cy.get('#correo').type('atorres@duocuc.cl'), {delay: 100}
        cy.wait(1500);
        cy.get('#password').type('1234'),{delay: 100}
        cy.wait(1500);
        cy.contains('Ingresar').click();
        cy.intercept('/inicio').as('route').then(() => {
          cy.wait(1500);
          cy.get('#foro').click();
          cy.wait(1500);
          cy.get('#titulo').type('Título Prueba'),{delay: 100}
          cy.wait(1500);
          cy.get('#contenido').type('Contenido Prueba'),{delay: 100}
          cy.wait(1500);
          cy.contains('Guardar').click();
          cy.wait(1500);
          cy.contains('Aceptar').click();
          cy.wait(1500);
          cy.get('#boton-salir').click();
        });
      });
    });
  
  
    it('verificar borrar publicacion', () => {
      cy.wait(1500);
      cy.visit('localhost:8100').then(() => {
        cy.wait(1500);
        cy.get('#correo').type('atorres@duocuc.cl'), {delay: 100}
        cy.wait(1500);
        cy.get('#password').type('1234'),{delay: 100}
        cy.wait(1500);
        cy.contains('Ingresar').click();
        cy.intercept('/inicio').as('route').then(() => {
          cy.wait(1500);
          cy.get('#foro').click();
          cy.wait(1500);
          cy.get('#boton-eliminar').click();
          cy.wait(1500);
          cy.contains('Aceptar').click();
          cy.get('#boton-salir').click();
        });
      });
    });
  
  
  it('verificar actualizar "mis datos"', () => {
    cy.wait(1500);
    cy.visit('localhost:8100').then(() => {
      cy.wait(1500);
      cy.get('#correo').type('atorres@duocuc.cl'), {delay: 100}
      cy.wait(1500);
      cy.get('#password').type('1234'),{delay: 100}
      cy.wait(1500);
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.wait(1500);
        cy.get('#misdatos').click();
        cy.wait(1500);
        cy.get('#nombre').invoke('val','C'),{delay: 100}
        cy.get('#nombre').type('arlos')
        cy.wait(1500);
        cy.get('#apellidos').invoke('val','I'),{delay: 100}
        cy.get('#apellidos').type('riarte')
        cy.wait(1500);
        cy.get('#pregunta-secreta').invoke('val','nombre de mi perr'),{delay: 100}
        cy.get('#pregunta-secreta').type('o')
        cy.wait(1500);
        cy.get('#respuesta-secreta').invoke('val','T'),{delay: 100}
        cy.get('#respuesta-secreta').type('obby')
        cy.wait(1500);
        cy.get('#contraseña').type('4321'),{delay: 100}
        cy.wait(1500);
        cy.get('#repetircontraseña').type('4321'),{delay: 100}
        cy.wait(1500);
        cy.get('#guardar-datos').click();
        cy.wait(1500);
        cy.get('#qr').click();
        cy.wait(1500);
        cy.get('#saludo').should('contain.text','¡Bienvenido(a) Carlos Iriarte!')
        cy.get('#boton-salir').click();
      });
    });
  }); 
});