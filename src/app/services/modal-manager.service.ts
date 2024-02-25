import { EventEmitter, Injectable } from '@angular/core';

import {
  ModalDismissReasons,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import {
  ReorderFirestoreDocument,
  ReorderModalComponent,
} from '../components/admin/modals/reorder-modal/reorder-modal.component';
import { ContentBlock } from './firebase/firestore.service';
import { ELEMENT_TYPES } from './admin/order-update.service';
import { DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ModalManagerService {
  closeResult: EventEmitter<string> = new EventEmitter();
  modalRef?: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  open(param: any = null, elementType:string = ELEMENT_TYPES.CONTENT) {
    this.modalRef = this.modalService.open(ReorderModalComponent, {
      ariaLabelledBy: 'mytitle',
    });

    let reorderFirestoreDocs: ReorderFirestoreDocument[] = [];
    param.forEach((content: DocumentData, index:any) => {
      if(content['order'] == undefined) content['order'] = index;
      let reorderFiredoc: ReorderFirestoreDocument = {
        elementType: ELEMENT_TYPES.CONTENT,
        order: (content as ContentBlock).order,
        id: (content as ContentBlock).id,
        document: content,
      } as ReorderFirestoreDocument;
      reorderFirestoreDocs.push(reorderFiredoc);
    });


    this.modalRef.componentInstance.init(reorderFirestoreDocs, elementType);

    // .then(
    //   (result) => {
    //     this.closeResult.emit(`Closed: ${result}`);
    //   },
    //   (reason) => {
    //     this.closeResult.emit(`Dismissed: ${this.getDismissReason(reason)}`);
    //   },
    // );
  }
  close() {
    if (this.modalRef) this.modalRef?.close();
  }

  getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
