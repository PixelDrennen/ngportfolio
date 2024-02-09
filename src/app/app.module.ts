import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { AdminOverlayComponent } from './components/overlays/admin-overlay/admin-overlay.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { WorkComponent } from './components/pages/work/work.component';
import { ContentComponent } from './components/shared/content/content.component';
import { WorkdocCreatorComponent } from './components/admin/editors/workdoc-creator/workdoc-creator.component';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { AdminLoginComponent } from './components/pages/admin-login/admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SummaryboxComponent } from './components/overlays/summarybox/summarybox.component';
import { SafePipe } from './pipes/youtube/safe.pipe';
import { HIGHLIGHT_OPTIONS, HighlightModule, HighlightJS, HighlightOptions } from 'ngx-highlightjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateComponent } from './components/overlays/crud/create/create.component';
import { CreateButtonComponent } from './components/shared/crud/create-button/create-button.component';
import { EditButtonComponent } from './components/shared/crud/edit-button/edit-button.component';
import { DeleteButtonComponent } from './components/shared/crud/delete-button/delete-button.component';
import { EditContentWindowComponent } from './components/admin/editors/edit-content-window/edit-content-window.component';
import { CreateContentWindowComponent } from './components/admin/editors/create-content-window/create-content-window.component';
import { ContentOptionBoxComponent } from './components/shared/crud/content-option-box/content-option-box.component';
import { ImageCreatorWindowComponent } from './components/admin/creator-windows/image-creator-window/image-creator-window.component';
import { TextCreatorWindowComponent } from './components/admin/creator-windows/text-creator-window/text-creator-window.component';
import { VideooCreatorWindowComponent } from './components/admin/creator-windows/videoo-creator-window/videoo-creator-window.component';
// import { HttpClientModule }
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    WorkComponent,
    ContentComponent,
    WorkdocCreatorComponent,
    AdminOverlayComponent,
    AdminLoginComponent,
    SummaryboxComponent,
    CreateComponent,
    CreateButtonComponent,
    EditButtonComponent,
    DeleteButtonComponent,
    EditContentWindowComponent,
    CreateContentWindowComponent,
    ContentOptionBoxComponent,
    ImageCreatorWindowComponent,
    TextCreatorWindowComponent,
    VideooCreatorWindowComponent,
  ],
  imports: [
    HighlightModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule,
    MatTooltipModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideMessaging(() => getMessaging()),
  ],
  providers: [
    SafePipe,
    HighlightJS,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions> {
        lineNumbers:true,
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
        themePath: 'assets/atom-one-dark.css',
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
          css: () => import('highlight.js/lib/languages/css'),
          c: () => import('highlight.js/lib/languages/c'),
          csharp: () => import('highlight.js/lib/languages/csharp'),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
