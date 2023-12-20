import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from "@angular/common/http";
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app/routes';
import { provideState, provideStore } from '@ngrx/store';
import { zipCodesReducer } from './app/store/zip-codes/zip-codes.reducers';
import { provideEffects } from '@ngrx/effects';
import * as zipCodesEffects from './app/store/zip-codes/zip-codes.effects';
import { DataAPIService } from './app/services/data-api';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { ZIP_CODES_FEATURE_KEY } from './app/constants/zip-codes.constants';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(ROUTES),
    provideStore(),
    provideState({ name: ZIP_CODES_FEATURE_KEY, reducer: zipCodesReducer }),
    provideEffects(zipCodesEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    }),
    DataAPIService
  ]
}).catch((err) => console.error(err));
