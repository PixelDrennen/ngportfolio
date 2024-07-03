import { Component } from '@angular/core';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  routeUrl: string = '';
  resumeID:string = 'Kfz1tlRqlwBLkgZmsw60';
  resumeDoc$?:Observable<DocumentData|undefined>;
  resumeDoc?:DocumentData;

  constructor(private globalService: GlobalService, private firestore:FirestoreService) {
    globalService.routeSubject.subscribe((a) => {
      this.routeUrl = a;
    });

    this.resumeDoc$ = firestore.getDocumentAsFirestore('content', this.resumeID);
    this.resumeDoc$.subscribe(a =>{
      this.resumeDoc = a;
      console.log("resumedoc",a);
    })
    
  }

  navigate(url: string) {
    this.globalService.setRoute(url);
  }
}
