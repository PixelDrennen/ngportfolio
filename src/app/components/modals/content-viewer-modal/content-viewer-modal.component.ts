import { Component } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { ContentModalManagerService } from 'src/app/services/content-modal-manager.service';
@Component({
  selector: 'app-content-viewer-modal',
  templateUrl: './content-viewer-modal.component.html',
  styleUrl: './content-viewer-modal.component.scss',
})
export class ContentViewerModalComponent {
 constructor(public contentModalService: ContentModalManagerService) {}
}
