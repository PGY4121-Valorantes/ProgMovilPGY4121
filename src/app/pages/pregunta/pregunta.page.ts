import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario = new Usuario('','','','','');
  public respuesta: string = '';
  public correo: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) 
  {

    this.activatedRoute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras && navigation.extras.state) {
        this.usuario = navigation.extras.state["usuario"]
      } else {
        this.router.navigate(['/ingreso']);
      }
    });
  }

  ngOnInit() {
  }

  public validarRespuestaSecreta(): void {
    const usuario = new Usuario('', '', '', '', '');
    const usuarioEncontrado = usuario.buscarUsuarioPorCorreo(this.correo);
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: usuarioEncontrado
      }
    };
    if (this.usuario.respuestaSecreta === this.respuesta) {
      this.router.navigate(['/correcto'], navigationExtras);
    }
    else {
      this.router.navigate(['/incorrecto']);
    }
  }

}
