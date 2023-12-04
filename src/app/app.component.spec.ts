import { Usuario } from './model/usuario';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IonicModule } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';



describe('Probar el comienzo de la aplicación', () => {
  
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('Se debería crear la aplicación', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Probar que el título sea correcto', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Asistencia DUOC');
  });

});