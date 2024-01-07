import { Injectable } from '@angular/core';
// import { }
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

export interface Item {
  id: string,
  name: string,
  description: string,
  img: string,
  workdoc:string
}

export interface WorkDoc {
  id: string,
  title: string,
  subtitle: string,
  body: string,
  featureBody: string,
  footer: string,
  images: any,
  featureImage:any,
  contentRows:ContentRow[]
}

export interface ContentRow {
  id:string,
  content:ContentBlock[]
}
export interface ContentBlock{
  type:string,
  value:string
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  // collection_items: AngularFirestoreCollection<Item>;
  snapshot: any;
  items?: Item[];

  // public items$: Observable<any[]>;
  constructor(public firestore: AngularFirestore) {
    // const mycollection = collection(firestore, 'items')
    // this.items$ = collectionData(mycollection);
    // this.collection_items = this.firestore.collection('items', ref => ref.orderBy('name'));
    this.waitForItems();
  }

  waitForItems() {
    this.snapshot = this.firestore.collection<Item>('items', ref => ref.orderBy('order')).snapshotChanges().pipe(
      map(changes =>
        changes.map(i =>
          ({ ...i.payload.doc.data() })))).subscribe(data => {
            this.items = data;
            return this.items;
          })
  }

  workdocs?:WorkDoc[];
  getworkdocs() {
    const snap = this.firestore.collection<WorkDoc>('workdocs', ref => ref.orderBy('order')).snapshotChanges().pipe(
      map(changes => changes.map(i => ({ ...i.payload.doc.data() })))).subscribe(data => { this.workdocs = data; });
  }
  
  
  selectedWorkDoc?:WorkDoc;
  
  async getWorkDoc(id: string) {

    const docRef = this.firestore.collection<WorkDoc>("workdocs");
    let cDoc: WorkDoc | undefined = undefined;

    await docRef.doc(id).ref.get().then(async function (doc) {
      const _workdoc: WorkDoc = doc.data() as WorkDoc;
      if (_workdoc) {
        _workdoc.id = doc.id;
        cDoc = _workdoc;
        console.log(_workdoc.contentRows);

      } 
    });
    
    
    this.selectedWorkDoc = cDoc;
  }

  public getDocument(url: string) {

  }
}
