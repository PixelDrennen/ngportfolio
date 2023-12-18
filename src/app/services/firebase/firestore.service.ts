import { Injectable } from '@angular/core';
// import { }
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

interface Item {
  id:string,
  name:string,
  description:string,
  img:string
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  // collection_items: AngularFirestoreCollection<Item>;
  snapshot:any;
  items?:Item[];
  
  // public items$: Observable<any[]>;
  constructor(public firestore: AngularFirestore) {
    // const mycollection = collection(firestore, 'items')
    // this.items$ = collectionData(mycollection);
    // this.collection_items = this.firestore.collection('items', ref => ref.orderBy('name'));
    this.waitForItems();
  }
  
  waitForItems(){
    this.snapshot = this.firestore.collection<Item>('items', ref => ref.orderBy('order')).snapshotChanges().pipe(
      map(changes =>
        changes.map(i => 
          ({ ...i.payload.doc.data()})))).subscribe(data => {
            this.items = data;
            return this.items;
          })
  }

  public getDocument(url: string) {

  }
}
