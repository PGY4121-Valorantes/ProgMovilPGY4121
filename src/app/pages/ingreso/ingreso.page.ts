import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {


  public usuario: Usuario;
  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('', '', '', '', '');
    this.usuario.correo = '';
    this.usuario.password = '';
  }

  public ngOnInit(): void {

    /*
      Las siguientes 3 líneas de código sirven para lo siguiente:
        Caso 1: Si las comentas, la página quedará lista para ingresar el nombre de
          usuario y la password
        Caso 2: Si dejas las instrucciones sin comentar, entonces entrará inmediatamente
          a la página home, usando el usuario por defecto "cgomezvega" con la
          password "123". Lo anterior es muy útil para el caso en que ya quedó lista
          la página de login y me interesa probar las otras páginas, de este modo se saltará
          el login y no tendrás que estar digitando los datos todo el tiempo.
    */
  }


  public ingresar(): void {

    if(!this.validarUsuario(this.usuario)) {
      return;
    }

    this.mostrarMensaje('¡Bienvenido!');

    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
   
    this.router.navigate(['/inicio'], navigationExtras);
  }

  public ingresarPaginaValidarCorreo(): void {
    this.router.navigate(['/correo']);
  }

  
  public validarUsuario(usuario: Usuario): boolean {

    const usu = this.usuario.buscarUsuarioValido(
      this.usuario.correo, this.usuario.password);

    if (usu) {
      this.usuario = usu;
      return true;
    }
    else {
      this.mostrarMensaje('Las credenciales no son correctas!');
      return false;
    }
  }

  /**
   * Muestra un toast al usuario
   *
   * @param mensaje Mensaje a presentar al usuario
   * @param duracion Duración el toast, este es opcional
   */
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

}
