import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateWindowService } from 'src/app/services/admin/crud/create-window.service';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import {
  WorkDoc,
  Item,
  FirestoreService,
  Collaborator,
  ContentRow,
  ContentBlock,
} from 'src/app/services/firebase/firestore.service';
import { CONTENT_TYPES, GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-summarybox',
  templateUrl: './summarybox.component.html',
  styleUrl: './summarybox.component.scss',
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
export class SummaryboxComponent implements OnInit {
  @Input() selected: boolean = false;
  @Input() selectedItem?: Item;

  @Output() selectItemEvent = new EventEmitter<Item>();

  contentTypes = CONTENT_TYPES;

  // rows?: string[] = [] as string[];
  rows?: ContentRow[] = [] as ContentRow[];

  contentPerRow?: ContentBlock[][] = [] as ContentBlock[][];

  constructor(
    public firestore: FirestoreService,
    public global: GlobalService,
    public userAuth: UserAuthService,
    public createWindowService: CreateWindowService,
  ) {
    // console.log(this.rows$);
  }
  ngOnInit(): void {}

  update() {
    console.log('updating');
    // this.rows = this.firestore.selectedWorkDoc?.contentRows;
    this.getRows();
    // if (this.rows)
    //   for (let i = 0; i < this.rows.length; i++) {
    //     console.log(this.rows[i]);
    //     this.firestore.getRow(this.rows[i]).subscribe((a) => {
    //       console.log(a);
    //       this.rows$?.next(a);
    //     });
    //   }
  }
  logme(a: any) {
    console.log('logme:', a);
  }

  async getcblock(c: string) {
    const cblock = await this.firestore.getContentBlock(c);
    cblock.subscribe((a) => {
      console.log(a.value, a.type);
    });
    // return cblock;
    return '';
  }

  getRows() {
    this.rows = [];
    this.contentPerRow = [];
    //this.firestore.firestore
    console.log(this.selectedItem);
    const result = this.firestore.getRowsForWorkdoc(
      this.selectedItem?.workdoc!,
    );
    result.then((a) => {
      a.forEach((row) => {
        console.log(row.id);
        const _row = row.data() as ContentRow;
        _row.id = row.id;
        this.rows?.push(_row);

        this.getContentForRow(row.id);
      });
    });
  }

  getContentForRow(id: string) {
    // console.log('Getting content for row', id);
    this.firestore.getContentForRow(id).then((contentArr) => {
      let contentInRow: ContentBlock[] = [];

      console.log('row', id, ':', contentInRow);
      contentArr.forEach((content) => {
        let cblock: ContentBlock = {
          id: content.id,
          ...content.data(),
        } as ContentBlock;
        // cblock.id = content.id;
        contentInRow.push(cblock);
      });
      this.contentPerRow?.push(contentInRow);

      if (contentInRow != undefined) {
        if (contentInRow.length > 0)
          this.createWindowService.order = contentInRow.length - 1;
        else this.createWindowService.order = 0;
      }
    });

    // console.log(this.contentPerRow);
  }

  select() {
    this.update();
    this.selectItemEvent.emit(this.selectedItem);
  }

  onKeyUp(event: any) {
    // console.log("key pressed");
    // if (event.key == 'Escape') {
    if (this.selected) {
      this.select();
    }
    // }
  }
  openSocialLink(url: string) {
    window.open(url, '_blank');
  }

  setWidthOfImage(img: HTMLElement, content: ContentBlock) {
    console.log('setting size for element', img.nodeName);
    // img.style.width = content.meta.width + '%';
    // img.style.height = content.meta.height + '%';
    // if (content.meta.wAuto) img.style.width = 'auto';
    // if (content.meta.hAuto) img.style.height = 'auto';
  }

  beginCreateContent(rowId: string) {
    console.log(`begin edit in row ${rowId}`);
    this.createWindowService.showWindow = true;
    this.createWindowService.rowId = rowId;
    this.getContentForRow(rowId);
    // this.createWindowService.order =
  }
}
