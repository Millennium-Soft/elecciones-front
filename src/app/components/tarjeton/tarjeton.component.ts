import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from '@angular/fire/firestore';
import { Auth, signOut, User } from '@angular/fire/auth';
import Swal from 'sweetalert2';

// Declarar particlesJS para que Angular lo reconozca
declare var particlesJS: any;

@Component({
  selector: 'app-tarjeton',
  templateUrl: './tarjeton.component.html',
  styleUrls: ['./tarjeton.component.css'],
})
export class TarjetonComponent implements OnInit {
  user: User | null = null;

  constructor(private auth: Auth, private firestore: Firestore) {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }

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

  logout() {
    signOut(this.auth).then(() => {
      window.location.href = '/login';
    });
  }

  async votar(candidato: string) {
    console.log(candidato);

    if (!this.user) {
      console.error('No hay usuario autenticado');
      return;
    }

    const votoRef = doc(this.firestore, `votos/${this.user.uid}`);
    const votoSnap = await getDoc(votoRef);

    if (votoSnap.exists()) {
      Swal.fire(
        'Error',
        'Ya has votado. No puedes votar más de una vez.',
        'error'
      );
      return;
    }

    const voto = {
      nombre: this.user.displayName || '',
      correo: this.user.email || '',
      candidato: candidato,
      timestamp: new Date(),
    };

    console.log('VOTO::', voto);

    setDoc(votoRef, voto)
      .then(() => {
        Swal.fire(
          'Éxito',
          'Tu voto ha sido registrado correctamente.',
          'success'
        );
      })
      .catch((error) => {
        console.error('Error al registrar el voto:', error);
        Swal.fire('Error', 'No se pudo registrar tu voto.', 'error');
      });
  }

  ngOnInit() {}
}
