import { Injectable, inject } from '@angular/core';
// import { }
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';
// import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  docData,
  query,
  getDocs,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserAuthService } from '../auth/user-auth.service';
import { where } from 'firebase/firestore';

export interface Item {
  id: string;
  name: string;
  description: string;
  img: string;
  workdoc: string;
}

export interface WorkDoc {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  featureBody: string;
  footer: string;
  images: any;
  featureImage: any;
  contentRows: string[];
  collaborators: Collaborator[];
}
export interface Collaborator {
  id: string;
  name: string;
  role: string;
  image: string;
  socialLink: string;
}

export interface ContentRow {
  id: string;
  workdoc: string;
  // row: string[];
  // contentBlocks: ContentBlock[];
}
export interface ContentBlock {
  id: string;
  type: string;
  value: string;
  // meta:{
  //   width:20,
  //   height:20,
  //   wAuto:false,
  //   hAuto:true
  // }
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  // collection_items: AngularFirestoreCollection<Item>;
  //FirebaseError: Expected type 'Query', but it was: a custom wh objec
  firestore: Firestore = inject(Firestore);

  snapshot: any;
  items?: Item[];

  itemCol$: Observable<any[]>;

  workdocs$: Observable<any[]>;
  selectedWorkDoc?: WorkDoc;

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

    cDoc.subscribe((a) => {
      this.selectedWorkDoc = a;
    });
  }

  getRow(id: string) {
    const _collection = collection(this.firestore, 'contentRows');
    const _query = query(_collection);
    const _where = where('workdoc', '==', id);

    // const _data = collectionData(_query) as Observable<ContentRow[]>;
    // return _data;

    const _doc = docData(doc(_collection, id)) as Observable<ContentRow>;
    return _doc;
  }

  async getRowsForWorkdoc(rowId: string) {
    const _collection = collection(this.firestore, 'contentRows');
    const _where = where('workdoc', '==', rowId);
    const _query = query(_collection, _where);

    // const _data = collectionData(_query);

    const querySnapshot = await getDocs(_query);
    return querySnapshot;
    // querySnapshot.forEach((doc) => {
      
    // });

    // return _data;
  }
  async getContentForRow(id: string) {
    const _collection = collection(this.firestore, 'content');
    const _where = where('row', '==', id);
    const _query = query(_collection, _where);
    const querySnapshot = await getDocs(_query);
    return querySnapshot;

    // const _data = collectionData(_query) as Observable<ContentBlock[]>;

    // return _data;
  }

  async getContentBlock(id: string) {
    const _collection = collection(this.firestore, 'content');

    const _doc = docData(doc(_collection, id)) as Observable<ContentBlock>;
    return _doc;
    // _doc.subscribe((a) => {
    //   this.selectedWorkDoc = a;
    // });
  }

  public getDocument(url: string) {}
}
