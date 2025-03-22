import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.auth.onAuthStateChanged(user => {
        if (user) {
          observer.next(true);
        } else {
          this.router.navigate(['/login']); // Redirige al login si no está autenticado
          observer.next(false);
        }
      });
    });
  }
}
