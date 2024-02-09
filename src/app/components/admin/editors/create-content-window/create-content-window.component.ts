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

  imageURLEmitter: EventEmitter<string> = new EventEmitter();

  constructor(
    public createWindowService: CreateWindowService,
    private firestore: FirestoreService,
  ) {
    if (!this.createWindowService.rowId) {
      console.log(`Could not get row id. ${this.createWindowService.rowId}`);
      return;
    }

    this.imageURLEmitter.subscribe((url: string) => {
      // url
      let content: ContentBlock = {
        type: CONTENT_TYPES.IMAGE,
        value: url,
        row: this.createWindowService.rowId!,
        order: this.createWindowService.order,
      } as ContentBlock;
      this.firestore.addContentBlock(content);
    });
  }
  ngOnInit(): void {
    this.windowIsOpen = true;
  }

  handleOption(option: string) {
    // console.log(`option:${option}`)

    this.optionSelected = true;
    this.selectedOption = option;
    this.windowIsOpen = false;

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
}
