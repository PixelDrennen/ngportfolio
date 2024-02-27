import { Component, EventEmitter, Input } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ModalManagerService } from 'src/app/services/modal-manager.service';
import {
  ELEMENT_TYPES,
  OrderUpdateService,
} from 'src/app/services/admin/order-update.service';
import { DocumentData } from '@angular/fire/firestore';
import {
  ContentBlock,
  FirestoreService,
} from 'src/app/services/firebase/firestore.service';
import { ReadTrackerService } from 'src/app/services/firestore/read-tracker.service';

export interface ReorderFirestoreDocument {
  id: string;
  order: number;
  elementType: string; // 'CONTENT_BLOCK' | 'ROW' | 'COLUMN' | 'WORKDOC' | 'ITEM'
  document?: DocumentData;
  arrDocuments?: DocumentData[];
}

@Component({
  selector: 'app-reorder-modal',
  templateUrl: './reorder-modal.component.html',
  styleUrl: './reorder-modal.component.scss',
})
export class ReorderModalComponent {
  constructor(
    private modalManager: ModalManagerService,
    private orderUpdateService: OrderUpdateService,
    private firestore: FirestoreService,
    private readTracker:ReadTrackerService,
  ) {
    // this.param.forEach((item) => {
    //   console.log(item.document);
    // });
  }
  elementTypes = ELEMENT_TYPES;
  _elementType: string = ELEMENT_TYPES.CONTENT;
  @Input() param: ReorderFirestoreDocument[] = [];
  @Input() resultEmitter: EventEmitter<ReorderFirestoreDocument[]> =
    new EventEmitter();

  rowData: DocumentData[][] = [];
  async getContentInRowAsFirestore(_doc?: ReorderFirestoreDocument) {
    // if(!_doc) return undefined;
    const _row = await this.firestore.getDocumentAsFirestoreAsync(
      this.elementTypes.ROW,
      _doc!.document!['id'],
    );
    const _content = await this.firestore.getContentForRow(_doc!['id']);
    // _content.docs.forEach((doc) => {
    //   console.log(doc.data()['value']);
    // });
    // console.log(_content.docs);
    const _contentBlocks = [] as ContentBlock[];

    // console.log('------------NEW ROW--------------');
    _content.forEach((d) => {
      // console.log(d.data());
      _contentBlocks.push(d.data() as ContentBlock);
    this.readTracker.saveRead();
  });
    return _contentBlocks;
  }

  init(
    param: ReorderFirestoreDocument[],
    elementType: string = this.elementTypes.CONTENT,
  ) {
    this.param = param;
    this._elementType = elementType;
    console.log(this.param);

    if (elementType == this.elementTypes.ROW) {
      this.setupRows(param);
    }

    // console.log(this.param);
  }
  async setupRows(param: ReorderFirestoreDocument[]) {
    for (const item of param) {
      const _content = await this.getContentInRowAsFirestore(item);
      this.rowData.push(_content);
    }
  }

  drop(event: any) {
    // if (this._elementType == this.elementTypes.CONTENT)
      moveItemInArray(this.param, event.previousIndex, event.currentIndex);
    if (this._elementType == this.elementTypes.ROW)
      moveItemInArray(this.rowData, event.previousIndex, event.currentIndex);
  }

  save() {
    // save list with new indices? ...
    // perhaps each item is an object instead of a string that holds the doc id and the order number, which is updated after based on index
    // if (this._elementType == this.elementTypes.CONTENT) {
      this.param.forEach((item, index) => {
        item.order = index;
        item.elementType = this._elementType;
        this.firestore
          .getDocumentAsFirestoreAsync(ELEMENT_TYPES.CONTENT, item.id)
          .then((_doc) => {
            item.document = _doc;
            this.orderUpdateService.onUpdateSubject.next(item);
          })
          .catch((error) => {
            console.log(`Could not get document with id ${item.id}.\n${error}`);
          });
      });
    // }

    if (this.resultEmitter) this.resultEmitter.emit(this.param);
  }

  dismiss() {
    this.modalManager.close();
    // if (this.resultEmitter) this.resultEmitter.emit([]);
  }
}
