import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HighlightJS } from 'ngx-highlightjs';
import { ContentComponent } from 'src/app/components/shared/content/content.component';
import { CreateWindowService } from 'src/app/services/admin/crud/create-window.service';
import { EditWindowService } from 'src/app/services/admin/crud/edit-window.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
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
    this.parseToLineBreaks(this.editWindowService.selectedContent?.value),
  );
  contentMetadataTextArea = new FormControl(
    this.parseToLineBreaks(this.editWindowService.selectedContent?.metadata),
  );

  windowIsOpen: boolean = false;

  constructor(
    public editWindowService: EditWindowService,
    public hjs: HighlightJS,
    public firestore: FirestoreService,
  ) {
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

    this.subscribeToTextChanges();
  }
  ngOnInit(): void {
    console.log(`Type: ${this.editWindowService.selectedContent?.type}`);
    // (this.contentValueTextArea as HTMLElement)
    // for (let i = 0; i < this.contentTypesDropdown.; i++) {
    //   if(this.contentTypesArr[i] ==)
    // }
  }

  @ViewChild(ContentComponent) appContent?: ContentComponent;

  subscribeToTextChanges() {
    this.contentValueTextArea.valueChanges.subscribe((val) => {
      // console.log(`Changed url to ${val?.toString()}`)
      this.appContent?.updateContent(val!);
      this.appContent?.checkContent();
    });
  }

  showCodeblock: boolean = true;

  parseToLineBreaks(str: string | undefined) {
    // console.log(str);
    if (str == undefined) return str;
    console.log(str.replaceAll('<br>', '\n'));
    this.showCodeblock = false;
    setTimeout(() => {
      this.showCodeblock = true;
    }, 100);

    return str.replaceAll('<br>', '\n');
  }
  parseToHTMLBreaks(str: string | undefined) {
    if (str == undefined) return str;
    if (
      this.editWindowService.selectedContent?.type !=
        this.contentTypes.CODEBLOCK &&
      this.editWindowService.selectedContent?.type != this.contentTypes.TEXT
    )
      return str;
    // const el = document.querySelector(`#${this.editWindowService.selectedContent!.id}`) as HTMLElement;
    // this.hjs.highlightElement(el);
    // this.hjs.highlightAll();
    // this.showCodeblock = false;
    // setTimeout(() => {
    //   this.showCodeblock = true;
    // }, 100);
    return str.replaceAll('\n', '<br>');
  }

  closeWindow() {
    this.editWindowService.showWindow = false;
  }

  async updateContent() {
    console.log(`Selected type: ${this.contentTypesDropdown.value}`);
    console.log(`Value: ${this.contentValueTextArea.value}`);

    this.editWindowService.selectedContent!.metadata = this.contentMetadataTextArea.value!;

    this.editWindowService.selectedContent!.type =
      this.contentTypesDropdown.value!.toLowerCase();

    this.editWindowService.selectedContent!.value =
      this.contentValueTextArea.value!;

    if (
      this.editWindowService.selectedContent!.type ==
        this.contentTypes.CODEBLOCK ||
      this.editWindowService.selectedContent!.type == this.contentTypes.TEXT
    )
      this.editWindowService.selectedContent!.value = this.parseToHTMLBreaks(
        this.editWindowService.selectedContent!.value!,
      )!;

    this.firestore
      .updateContentBlock(this.editWindowService.selectedContent!)
      .then(() => {
        this.closeWindow();
      });
  }
  async deleteContent() {
    this.firestore
      .deleteContentBlock(this.editWindowService.selectedContent!)
      .then(() => {
        this.closeWindow();
      });
  }
}
