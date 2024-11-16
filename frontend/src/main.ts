import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
// Instalar el paquete: npm install @ionic/pwa-elements

// Llamar al cargador de elementos PWA después de que la plataforma haya sido inicializada
defineCustomElements(window);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
