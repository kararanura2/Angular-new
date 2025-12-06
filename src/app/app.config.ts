import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { fightersReducer, fightersFeatureKey } from './states/fighters/fighters.reducer';
import { FightersEffects } from './states/fighters/fighters.effects';
import { provideServiceWorker } from '@angular/service-worker';


console.log("FIREBASE CONFIG:", environment.firebase);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes),
    provideHttpClient(),

    // Firebase init
    provideFirebaseApp(() => {
      console.log("INITIALIZING FIREBASE WITH:", environment.firebase);
      return initializeApp(environment.firebase);
    }),
    provideAuth(() => getAuth()),
    
    provideStore({
      [fightersFeatureKey]: fightersReducer
    }),
    provideEffects([FightersEffects]),
    provideStoreDevtools(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
    
  ]
};
