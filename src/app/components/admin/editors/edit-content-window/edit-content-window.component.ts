import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CreateWindowService } from 'src/app/services/admin/crud/create-window.service';
import { EditWindowService } from 'src/app/services/admin/crud/edit-window.service';
import { CONTENT_TYPES } from 'src/app/services/global.service';

@Component({
  selector: 'app-edit-content-window',
  templateUrl: './edit-content-window.component.html',
  styleUrl: './edit-content-window.component.scss',
})
export class EditContentWindowComponent implements OnInit, AfterViewInit {
  selectedOption: string = 'none';
  contentTypes = CONTENT_TYPES;
  contentTypesArr = Object.keys(CONTENT_TYPES);

  contentTypesDropdown = new FormControl(
    this.editWindowService.selectedContent?.type.toUpperCase(),
  );
  contentValueTextArea = new FormControl(
    this.editWindowService.selectedContent?.value,
  );

  windowIsOpen: boolean = false;

  constructor(public editWindowService: EditWindowService) {
    this.windowIsOpen = true;
  }
  ngAfterViewInit(): void {
    const contentValueTextAreaElement: HTMLElement | null =
      document.querySelector('#contentValueTextArea');
    if (contentValueTextAreaElement != null) {
      contentValueTextAreaElement.style.height = '1px';
      contentValueTextAreaElement.style.height =
        25 + contentValueTextAreaElement.scrollHeight + 'px';
    }
  }
  ngOnInit(): void {
    console.log(`Type: ${this.editWindowService.selectedContent?.type}`);
    // (this.contentValueTextArea as HTMLElement)
    // for (let i = 0; i < this.contentTypesDropdown.; i++) {
    //   if(this.contentTypesArr[i] ==)
    // }
  }

  closeWindow() {
    this.editWindowService.showWindow = false;
  }
}
