import { Injectable } from '@angular/core';
import { DataSnapshotsService } from './data-snapshots.service';
import { firstValueFrom } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { Item } from '../firebase/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class DataControllerService {

  constructor(private dataSnapshots:DataSnapshotsService) {
    this.dataSnapshots.subscribe_ItemCollection();
   }
  

  async loadItemFully(id:string){
    console.log(`${id}`)
    this.dataSnapshots.subscribe_SelectedItem(id);
  }
}
