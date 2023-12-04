import { ActivatedRoute, NavigationExtras, Router, RouterLink } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-correcto',
    templateUrl: './correcto.page.html',
    styleUrls: ['./correcto.page.scss'],
    standalone: true,
    imports: [IonicModule, RouterLink],
})
export class CorrectoPage implements OnInit {

  public usuario: Usuario = new Usuario();
  public password: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) 
  {

    this.activatedRoute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras && navigation.extras.state) {
        this.usuario = navigation.extras.state["usuario"];
        console.log(this.usuario);
        
      } else {
        this.router.navigate(['/ingreso']);
      }
    });
  }

  ngOnInit() {
  }

  public volverIngresar(): void {
    this.router.navigate(['/ingreso']);
  }
}