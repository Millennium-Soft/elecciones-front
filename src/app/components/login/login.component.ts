import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

// Declarar particlesJS para que Angular lo reconozca
declare var particlesJS: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  anioActual = new Date();

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Cargar particles.js después de que la vista esté lista
    this.loadParticles();
  }

  loadParticles(): void {
    if (typeof particlesJS !== 'undefined') {
      particlesJS.load('particles-js', 'assets/data/particles.json', () => {
        console.log('Particles.js cargado correctamente');
      });
    } else {
      console.error('particlesJS no está definido. Verifica que la librería esté cargada.');
    }
  }

  async loginGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      console.log('Usuario autenticado:', result.user);
      this.router.navigate(['/tarjeton']); // Redirige después del login
    } catch (error) {
      console.error('Error en autenticación:', error);
    }
  }
}
