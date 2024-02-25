import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { CreateWindowService } from 'src/app/services/admin/crud/create-window.service';
import {
  ContentBlock,
  FirestoreService,
} from 'src/app/services/firebase/firestore.service';
import { CONTENT_TYPES } from 'src/app/services/global.service';
@Component({
  selector: 'app-create-content-window',
  templateUrl: './create-content-window.component.html',
  styleUrl: './create-content-window.component.scss',
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translate(0,0);' })),
      transition('void => *', [
        animate(300, style({ opacity: 1, transform: 'translate(0,0)' })),
      ]),
      transition('* => void', [
        animate(300, style({ opacity: 0, transform: 'translate(-50%,0)' })),
      ]),
    ]),
  ],
})
export class CreateContentWindowComponent implements OnInit {
  // @Input() rowId?:string;

  selectedOption: string = 'none';
  optionSelected: boolean = false;
  contentTypes = CONTENT_TYPES;

  windowIsOpen: boolean = false;

  // imageURLEmitter: EventEmitter<string> = new EventEmitter();
  valueEmitter: EventEmitter<string> = new EventEmitter();

  constructor(
    public createWindowService: CreateWindowService,
    private firestore: FirestoreService,
  ) {
    if (!this.createWindowService.getRowId()) {
      console.log(`Could not get row id. ${this.createWindowService.getRowId()}`);
      return;
    }



   
  }

  // subscribeToImageURL() {
  //   this.imageURLEmitter.subscribe((url: string) => {
  //     console.log(`contentOrder: ${this.createWindowService.getOrder()}`);
  //     // url
  //     let content: ContentBlock = {
  //       type: CONTENT_TYPES.IMAGE,
  //       value: url,
  //       row: this.createWindowService.getRowId(),
  //       order: this.createWindowService.getOrder(),
  //     } as ContentBlock;
  //     this.firestore.addContentBlock(content);
  //   });
  // }
  subscribeToValue() {

    this.valueEmitter.subscribe((value: string) => {
      console.log("Adding content:",`contentType: ${this.selectedOption.toUpperCase()} contentOrder: ${this.createWindowService.getOrder()} contentValue: ${value}`);
      let content: ContentBlock = {
        type: this.selectedOption,
        value: value,
        row: this.createWindowService.getRowId(),
        order: this.createWindowService.getOrder(),
      } as ContentBlock;
      this.firestore.addContentBlock(content);
    });
  }

  ngOnInit(): void {
    this.windowIsOpen = true;
  }

  handleOption(option: string) {
    // console.log(`option:${option}`)

    if(option == CONTENT_TYPES.SPACER){
      console.log("Adding spacer");
      this.fs_createContent(option, "");
      this.windowIsOpen = false;
    } else{
      this.optionSelected = true;
      this.selectedOption = option;
      this.windowIsOpen = false;
      this.subscribeToValue();
    }

    

    // if (
    //   this.selectedOption == this.contentTypes.TEXT ||
    //   this.selectedOption == this.contentTypes.CODEBLOCK
    // ) {
    //   console.log('Subscribing to value')
    //   this.subscribeToValue();
    // } else {
    //   console.log('Subscribing to image')
    //   this.subscribeToImageURL();
    // }

    // switch (option) {
    //   case CONTENT_TYPES.IMAGE:
    //     break;
    //   case CONTENT_TYPES.VIDEO:
    //     break;
    //   case CONTENT_TYPES.AUDIO:
    //     break;
    //   case CONTENT_TYPES.TEXT:
    //     break;
    //   case CONTENT_TYPES.CODEBLOCK:
    //     break;
    //   case CONTENT_TYPES.MODEL:
    //     break;
    //   case CONTENT_TYPES.SPACER:
    //     // add spacer and finish
    //     this.optionSelected = false;
    //     this.selectedOption = '';
    //     let content:ContentBlock = {
    //       type: CONTENT_TYPES.SPACER
    //     } as ContentBlock;
    //     // this.firestore.add
    //     break;
    //   case CONTENT_TYPES.HYPERLINK:
    //     break;
    //   case CONTENT_TYPES.EMBED:
    //     break;
    //   case CONTENT_TYPES.CAROUSEL:
    //     break;
    //   case CONTENT_TYPES.GALLERY:
    //     break;
    //   case CONTENT_TYPES.BUTTON:
    //     break;
    // }
  }

  fs_createContent(contentType:string, contentValue:string){
    let content: ContentBlock = {
      type: contentType,
      value: contentValue,
      row: this.createWindowService.getRowId(),
      order: this.createWindowService.getOrder(),
    } as ContentBlock;
    this.firestore.addContentBlock(content);
  }
}
