import { Injectable, inject } from '@angular/core';
// import { }
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';
// import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection, doc, docData, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserAuthService } from '../auth/user-auth.service';

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
  }

  
  async getWorkDoc(id: string) {
    const workdocCol = collection(this.firestore, 'workdocs');

    const cDoc = docData(doc(workdocCol, id)) as Observable<WorkDoc>;
    
    cDoc.subscribe(a => {
      this.selectedWorkDoc = a;
    })
    
  }

  public getDocument(url: string) {

  }
}
