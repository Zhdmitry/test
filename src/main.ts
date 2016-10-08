import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';


import './styles.css'
// enableProdMode(); 



platformBrowserDynamic().bootstrapModule(AppModule);
