import { ActivatedRoute, NavigationExtras, Router, RouterLink } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-pregunta',
    templateUrl: './pregunta.page.html',
    styleUrls: ['./pregunta.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        FormsModule,
        RouterLink,
    ],
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario = new Usuario();
  public respuesta: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) 
  {

    this.activatedRoute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras && navigation.extras.state) {
        this.usuario = navigation.extras.state["usuario"];
      } else {
        this.router.navigate(['/ingreso']);
      }
    });
  }

  ngOnInit() {
  }

  public validarRespuestaSecreta(): void {
    
    if (this.usuario.respuestaSecreta === this.respuesta) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };
      this.router.navigate(['/correcto'], navigationExtras);
    }
    else {
      this.router.navigate(['/incorrecto']);
    }
  }

  public volverIngresar(): void {
    this.router.navigate(['/ingreso']);
  }

}
