import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  title = 'Drennen Dooms';
  numbers:any[];
  numbers2:any[];
  
  constructor(public firestore:FirestoreService){
    this.numbers = Array(5).fill(10);
    this.numbers2 = Array(10).fill(10);
  }
}
