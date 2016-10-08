import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import './assets/style.css'
import { AppModule } from './app/app.module';

// enableProdMode(); 

platformBrowserDynamic().bootstrapModule(AppModule);
