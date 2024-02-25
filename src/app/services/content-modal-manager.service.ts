import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ContentViewerModalComponent } from '../components/modals/content-viewer-modal/content-viewer-modal.component';
import { FirestoreService } from './firebase/firestore.service';
import { Observable, Subscription, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentModalManagerService {
  selectedContent$?: Observable<DocumentData|undefined>;
  selectedContent?: DocumentData|undefined;
  private modalRef?: NgbModalRef;
  contentViewable:boolean = false;

  constructor(private modalService: NgbModal, private firestore:FirestoreService) {}

  setSelectedContent(contentID:string) {
    this.selectedContent$ = this.firestore.getDocumentAsFirestore('content', contentID);
    this.selectedContent$?.subscribe(content =>{
      this.selectedContent = content;
      this.contentViewable = true;
    })
  }
  open() {
    this.contentViewable = false;
    this.modalRef = this.modalService.open(ContentViewerModalComponent, {size:'lg', centered:true});
  }
  close() {
    if (this.modalRef) {
      this.modalRef.close();
      this.contentViewable = false;
    }
  }
}
