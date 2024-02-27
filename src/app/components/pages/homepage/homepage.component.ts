import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { DataControllerService } from 'src/app/services/firestore/data-controller.service';
import { DataSnapshotsService } from 'src/app/services/firestore/data-snapshots.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  title = 'Drennen Dooms';
  numbers:any[];
  numbers2:any[];
  
  constructor(public firestore:FirestoreService, public dataSnapshots:DataSnapshotsService, public dataController:DataControllerService){
    this.numbers = Array(5).fill(10);
    this.numbers2 = Array(10).fill(10);

    // this.dataController.loadItemFully();
  }
}
