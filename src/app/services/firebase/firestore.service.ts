import { Injectable, inject } from '@angular/core';
// import { }
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';
// import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection, doc, docData, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  //FirebaseError: Expected type 'Query', but it was: a custom wh objec
  firestore: Firestore = inject(Firestore)
  

  snapshot: any;
  items?: Item[];

  itemCol$: Observable<any[]>;

  workdocs$: Observable<any[]>;
  selectedWorkDoc?:WorkDoc;

  // public items$: Observable<any[]>;
  constructor() {

    const itemCol = collection(this.firestore, 'items');
    const itemQuery = query(itemCol);

    this.itemCol$ = collectionData(itemQuery) as Observable<Item[]>;

    const workdocCol = collection(this.firestore, 'workdocs');
    const workdocQuery = query(workdocCol);

    this.workdocs$ = collectionData(workdocQuery) as Observable<WorkDoc[]>;
    // this.waitForItems();
  }

  waitForItems() {
    // const itemCol = collection(this.firestore, 'items');
    // this.itemCol = collectionData(itemCol) as Observable<Item[]>;

    // this.itemCol.subscribe(a =>{
    //   console.log(a);
    //   this.items = a;
    // })


    // this.snapshot = this.firestore.collection<Item>('items', ref => ref.orderBy('order')).snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(i =>
    //       ({ ...i.payload.doc.data() })))).subscribe(data => {
    //         this.items = data;
    //         return this.items;
    //       })
  }

  // workdocs?:WorkDoc[];
  // getworkdocs() {
  //   const snap = this.firestore.collection<WorkDoc>('workdocs', ref => ref.orderBy('order')).snapshotChanges().pipe(
  //     map(changes => changes.map(i => ({ ...i.payload.doc.data() })))).subscribe(data => { this.workdocs = data; });
  // }
  
  
  
  async getWorkDoc(id: string) {
    const workdocCol = collection(this.firestore, 'workdocs');

    const cDoc = docData(doc(workdocCol, id)) as Observable<WorkDoc>;

    // const docRef = this.firestore.collection<WorkDoc>("workdocs");
    // let cDoc: WorkDoc | undefined = undefined;

    // await docRef.doc(id).ref.get().then(async function (doc) {
    //   const _workdoc: WorkDoc = doc.data() as WorkDoc;
    //   if (_workdoc) {
    //     _workdoc.id = doc.id;
    //     cDoc = _workdoc;
    //     console.log(_workdoc.contentRows);

    //   } 
    // });
    
    cDoc.subscribe(a => {
      this.selectedWorkDoc = a;
    })
    
  }

  public getDocument(url: string) {

  }
}
