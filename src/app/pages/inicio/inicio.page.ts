import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimationController, IonicModule } from '@ionic/angular';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { ApiClientService } from 'src/app/services/api-client.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
  QrComponent, MiclaseComponent, ForoComponent, MisdatosComponent]
})
export class InicioPage implements OnInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  componente_actual = 'qr';

  constructor(
    private authService: AuthService, 
    private bd: DataBaseService,
    private api: ApiClientService,
    private animationController: AnimationController) { }

  ngOnInit() {
    this.authService.primerInicioSesion.subscribe(esPrimerInicioSesion => {
      this.componente_actual = 'qr';
      this.bd.datosQR.next('');
    });
  }

  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(0%)', 'translate(100%)')
        .fromTo('opacity', 0.7, 0.7);

      animation.play();
    }
  }

  cambiarComponente(nombreComponente: string) {
    this.componente_actual = nombreComponente;
    if (nombreComponente === 'foro') this.api.cargarPublicaciones();
    if (nombreComponente === 'misdatos') this.authService.leerUsuarioAutenticado();
  }

  cerrarSesion() {
    this.authService.logout();
  }

}
