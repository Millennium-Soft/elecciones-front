import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Voto {
  candidato: string;
}

// Declarar particlesJS para que Angular lo reconozca
declare var particlesJS: any;

@Component({
  selector: 'app-reporte-votos',
  templateUrl: './reporte-votos.component.html',
  styleUrls: ['./reporte-votos.component.css'],
})
export class ReporteVotosComponent implements OnInit {
  votos$: Observable<any[]>; // Observa la lista de votos
  resultados: { [candidato: string]: number } = {}; // Almacena el conteo de votos

  constructor(private firestore: Firestore) {
    const votosCollection = collection(this.firestore, 'votos');
    this.votos$ = collectionData(votosCollection) as Observable<Voto[]>;

    this.votos$.pipe(
      map((votos) => {
        const conteo: { [candidato: string]: number } = {};
        votos.forEach((voto) => {
          conteo[voto.candidato] = (conteo[voto.candidato] || 0) + 1;
        });
        return conteo;
      })
    ).subscribe((conteo) => {
      this.resultados = conteo;
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

  ngOnInit(): void {}
}
