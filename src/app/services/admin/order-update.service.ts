import { EventEmitter, Injectable } from '@angular/core';
import {
  ReorderFirestoreDocument,
  ReorderModalComponent,
} from 'src/app/components/admin/modals/reorder-modal/reorder-modal.component';
import { FirestoreService } from '../firebase/firestore.service';
import { doc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
export enum ELEMENT_TYPES {
  CONTENT = 'content',
  ROW = 'contentRows',
  COLUMN = 'contentColumns',
  WORKDOC = 'workdcos',
  ITEM = 'items',
} // element type names correlate to database collection names

@Injectable({
  providedIn: 'root',
})
export class OrderUpdateService {
  constructor(private firestore: FirestoreService) {
    this.onUpdateSubject.subscribe(reorder => {
      this.handleDoc(reorder);
    });
    
  }

  async handleDoc(reorder: ReorderFirestoreDocument) {
    if (!reorder || !reorder.id) return;

    const _doc = await this.firestore.getDocumentAsFirestoreAsync(
      reorder.elementType,
      reorder.id,
    );

    await updateDoc(
      doc(this.firestore.db, reorder.elementType.toString(), reorder.id),
      { order: reorder.order },
    ).then(() => {
      location.reload();
    });
  }

  onUpdateSubject: BehaviorSubject<ReorderFirestoreDocument> =
    new BehaviorSubject({} as ReorderFirestoreDocument);
}
