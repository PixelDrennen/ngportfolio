import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// bootstrapApplication(AppComponent, {
//   providers: [
//     {
//       provide: HIGHLIGHT_OPTIONS,
//       useValue: {
//         fullLibraryLoader: () => import('highlight.js'),
//         themePath: 'assets/styles/solarized-dark.css'
//       }
//     }, provideAnimationsAsync()
//   ]
// })

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
