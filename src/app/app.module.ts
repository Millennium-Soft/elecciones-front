import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { MaterialModules } from './material.modules';

import { MAT_DATE_LOCALE } from '@angular/material/core';

// Importaciones de Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FiltroSexoBiologicoPipe } from './pipes/filtro-sexo-biologico.pipe';
import { FiltroEstratoPipe } from './pipes/filtro-estrato.pipe';
import { FiltroMunicipioPipe } from './pipes/filtro-municipio.pipe';
import { EmailHidePipe } from './pipes/email-hide.pipe';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';

// Importa el idioma español de date-fns
import { es } from 'date-fns/locale';
import { environment } from 'src/environments/environment';
import { TarjetonComponent } from './components/tarjeton/tarjeton.component';
import { ReporteVotosComponent } from './components/reporte-votos/reporte-votos.component';

// Registra el idioma español para Angular
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FiltroSexoBiologicoPipe,
    FiltroEstratoPipe,
    FiltroMunicipioPipe,
    EmailHidePipe,
    TarjetonComponent,
    ReporteVotosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules,
    NgxPrintModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Inicializa Firebase
    provideAuth(() => getAuth()), // Habilita Auth
    provideFirestore(() => getFirestore()), // Habilita Firestore
  ],
  entryComponents: [

  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
