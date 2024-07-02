import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HomepageData } from 'src/app/interfaces/page-data-interfaces';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { DataControllerService } from 'src/app/services/firestore/data-controller.service';
import { DataSnapshotsService } from 'src/app/services/firestore/data-snapshots.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  title = 'Drennen Dooms';
  numbers:any[];
  numbers2:any[];
  // data$?:Observable<HomepageData|undefined>;
  data?:HomepageData|undefined;
  
  constructor(public firestore:FirestoreService, public dataSnapshots:DataSnapshotsService, public dataController:DataControllerService, private globalService:GlobalService){
    this.numbers = Array(5).fill(10);
    this.numbers2 = Array(10).fill(10);

    // this.dataController.loadItemFully();
    firestore.getDocumentAsFirestore('copy', 'homepage').subscribe(a =>{
      this.data = a;
    })
  }
  navigate(url: string) {
    this.globalService.setRoute(url);
  }
}
