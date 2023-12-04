import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit {

  correo = '';

  constructor(private bd: DataBaseService, private router: Router) { }

  ngOnInit(): void {
    
  }

  async ingresarPaginaPregunta() {
    const usu: Usuario | undefined = await this.bd.leerUsuario(this.correo);
    if (!usu) {
      this.router.navigate(['/incorrecto'])
      
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usu
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras);
      
    }
  }

  public volverIngresar(): void {
    this.router.navigate(['/ingreso']);
  }

}
