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
  setDoc,
  addDoc,
  orderBy,
  updateDoc,
  UpdateData,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserAuthService } from '../auth/user-auth.service';
import { CollectionReference, where } from 'firebase/firestore';
import { DocumentData } from '@angular/fire/firestore';

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
  row: string;
  order: number;
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

    this.itemCol$ = collectionData(itemQuery, { idField: 'id' }) as Observable<
      Item[]
    >;

    const workdocCol = collection(this.firestore, 'workdocs');
    const workdocQuery = query(workdocCol);

    this.workdocs$ = collectionData(workdocQuery, {
      idField: 'id',
    }) as Observable<WorkDoc[]>;
  }

  async getWorkDoc(id: string) {
    const workdocCol = collection(this.firestore, 'workdocs');

    const cDoc = docData(doc(workdocCol, id), {
      idField: 'id',
    }) as Observable<WorkDoc>;

    cDoc.subscribe((a) => {
      this.selectedWorkDoc = a;
    });
  }

  async getWorkdocAsFirestore(id: string) {
    const _collection = collection(this.firestore, 'workdocs');

    const _doc = docData(doc(_collection, id));
    return _doc;
  }
  async getDocumentAsFirestoreAsync(col:string, id: string) {
    const _collection = collection(this.firestore, col);

    const _doc = docData(doc(_collection, id));
    return _doc;
  }
  getDocumentAsFirestore(col:string, id: string) {
    const _collection = collection(this.firestore, col);

    const _doc = docData(doc(_collection, id));
    return _doc;
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
    const order = orderBy('order', 'asc');
    const _query = query(_collection, _where, order);

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
    const order = orderBy('order', 'asc');
    const _query = query(_collection, _where, order);
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

  public addContentBlock(content: ContentBlock) {
    const _collection = collection(this.firestore, 'content');

    addDoc(_collection, content)
      .then((a) => {
        console.log(`Document added. \n${a.id}`);
        location.reload();
      })
      .catch((error) => {
        console.log(`Could not add document. \n${error}`);
      });

    // setDoc(_collection, 'content')
  }

  async updateContentBlock(content: ContentBlock) {
    if (content.id == undefined) {
      console.error('No content id supplied for update.', content);
      return;
    }
    const _collection = collection(this.firestore, 'content');
    const _doc = doc(_collection, content.id);
    const data = content as DocumentData;

    console.log(`Ref retrieved: ${_doc.path}`);
    console.log(`Data retrieved: ${JSON.stringify(data)}`);

    await updateDoc(_doc, data)
      .then(() => {
        console.log('Content updated.');
        location.reload();
      })
      .catch((error) => {
        console.log('Could not update content.', error);
      });
  }

  async deleteContentBlock(content: ContentBlock) {
    if (content.id == undefined) {
      console.error('No content id supplied for delete.', content);
      return;
    }
    const _collection = collection(this.firestore, 'content');
    const _doc = doc(_collection, content.id);

    await deleteDoc(_doc)
      .then(() => {
        console.log('Content deleted.');
        location.reload();
      })
      .catch((error) => {
        console.log('Could not delete content.', error);
      });
  }

  async updateWorkDoc(workdoc: WorkDoc) {
    if (workdoc.id == undefined) {
      console.error('No workdoc id supplied for update.', workdoc);
      return;
    }
    const _collection = collection(this.firestore, 'workdocs');
    const _doc = doc(_collection, workdoc.id);
    const data = workdoc as DocumentData;

    // console.log(`Ref retrieved: ${_doc.path}`);
    // console.log(`Data retrieved: ${JSON.stringify(data)}`);

    await updateDoc(_doc, data)
      .then(() => {
        console.log('Workdoc updated.');
        // location.reload();
      })
      .catch((error) => {
        console.log('Could not update workdoc.', error);
      });
  }

  async addEmptyRow(workdoc: string, order: number) {
    if (workdoc == undefined) {
      console.error('No workdoc id supplied for update.', workdoc);
      return;
    }
    const _collection = collection(this.firestore, 'contentRows');
    const _doc = addDoc(_collection, {
      workdoc: workdoc,
      order: order,
    })
      .then((a) => {
        console.log(`Document added. \n${a.id}`);
        location.reload();
      })
      .catch((error) => {
        console.log(`Could not add document. \n${error}`);
      });
  }
}
