import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { AdminOverlayComponent } from './components/overlays/admin-overlay/admin-overlay.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { WorkComponent } from './components/pages/work/work.component';
import { ContentComponent } from './components/shared/content/content.component';
import { WorkdocCreatorComponent } from './components/admin/editors/workdoc-creator/workdoc-creator.component';
import { provideMessaging,getMessaging } from '@angular/fire/messaging'
// import { HttpClientModule }
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    WorkComponent,
    ContentComponent,
    WorkdocCreatorComponent,
    AdminOverlayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideMessaging(() => getMessaging())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
