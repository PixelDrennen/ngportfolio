import { Injectable } from '@angular/core';
import { FirestoreService } from '../firebase/firestore.service';
import {
  addDoc,
  deleteDoc,
  updateDoc,
  getDoc,
  collection,
  query,
  where,
  doc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private firestore: FirestoreService) {}

  
  //c

  create(collectionString: string, data: any) {
    const _collection = collection(this.firestore.firestore, collectionString);
    
    addDoc(_collection, data)
    .then((res) => {
      console.log(`Created document with id ${res.id}`);
    })
    .catch((err) => {
      console.log(`Could not create document. \n${err}`);
    });
  }
  
  //r
  read(collectionString: string, id: string) {
    const _doc = getDoc(doc(this.firestore.firestore, collectionString, id));
    return _doc;
  }

  //u
  update(collectionString: string, id: string, data: any) {
    const _doc = doc(this.firestore.firestore, collectionString, id);
    updateDoc(_doc, data)
      .then((res) => {
        console.log(`Updated document with id ${id}`);
      })
      .catch((err) => {
        console.log(`Could not update document. \n${err}`);
      });
  }

  //d
  delete(collectionString: string, id: string) {
    const _doc = doc(this.firestore.firestore, collectionString, id);
    deleteDoc(_doc)
      .then((res) => {
        console.log(`Deleted document with id ${id}`);
      })
      .catch((err) => {
        console.log(`Could not delete document. \n${err}`);
      });
  }
}
