import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateWindowService } from 'src/app/services/admin/crud/create-window.service';
import { ELEMENT_TYPES } from 'src/app/services/admin/order-update.service';
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
import { ModalManagerService } from 'src/app/services/modal-manager.service';

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

  editMode: boolean = false;

  contentTypes = CONTENT_TYPES;

  // rows?: string[] = [] as string[];
  rows?: ContentRow[] = [] as ContentRow[];

  contentPerRow?: ContentBlock[][] = [] as ContentBlock[][];
  contentPerRowAsFirestore?: DocumentData[][] = [] as DocumentData[][];

  fakeContentBlocks: number[][] = [] as number[][];

  constructor(
    public firestore: FirestoreService,
    public global: GlobalService,
    public userAuth: UserAuthService,
    public createWindowService: CreateWindowService,
    private modalManager: ModalManagerService,
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

  openSortModal(contentRow: DocumentData[]) {
    this.modalManager.open(contentRow);
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
    if(!this.selectedItem || !this.selectedItem.workdoc) return undefined;
    this.rows = [];
    this.contentPerRow = [];
    this.fakeContentBlocks = [];
    this.contentPerRowAsFirestore = [];
    //this.firestore.firestore
    console.log(this.selectedItem);
    const result = this.firestore.getRowsForWorkdoc(
      this.selectedItem?.workdoc!,
    );
    result.then((a) => {
      a.forEach((row) => {
        // console.log(row.id);
        const _row = row.data() as ContentRow;
        _row.id = row.id;
        this.rows?.push(_row);
        // console.log(`Row: ${_row.id}`);

        this.firestore.getContentForRow(row.id).then((contentArr) => {
          // console.log(contentArr.docs);
          // contentArr.docChanges()
          // contentArr.forEach((content) => {})
          let myArr = [] as DocumentData[];
          contentArr.forEach((content) => {myArr.push({id:content.id, ...content.data()})});
          this.contentPerRowAsFirestore?.push(myArr);
          this.getContentForRow(row.id, contentArr);
        });
      });
    });
  }

  rowContainsSpacer(elements:ContentBlock[]){
    return elements.some((element) => (element as ContentBlock).type == CONTENT_TYPES.SPACER) == false;
  }

  openModalForSortingRows(){
    const rowsInWorkdoc = this.firestore.getRowsForWorkdoc(
      this.selectedItem?.workdoc!,
    );

    // get rows in workdoc
    rowsInWorkdoc.then((rowsQuery) =>{
      // let rowsWithContent:DocumentData[][] = [];
      let _rows = [] as DocumentData[];
      // const _rows:ContentRow[] = [];
      rowsQuery.forEach((rowQueryData) =>{
        _rows.push({id:rowQueryData.id, ...rowQueryData.data()}); // add row document for later use


        // const _row = rowQueryData.data() as ContentRow;
        // _rows.push(_row);

        // this.firestore.getContentForRow(rowQueryData.id).then((contentArr) => {
          // const contentInRow = [] as DocumentData[];
          // contentArr.forEach((content) => {
          //   contentInRow.push({id:content.id, ...content.data()});
          // });
          // rowsWithContent.push(contentInRow);

        // });
        // rows.push(rowQueryData);
      });
        this.modalManager.open(_rows, ELEMENT_TYPES.ROW);
        // this.modalManager.open(rowsQuery);
    });
  }

  getContentForRow(
    id: string,
    contentArr: QuerySnapshot<DocumentData, DocumentData>,
  ) {
    let contentInRow: ContentBlock[] = [];

    // console.log('row', id, ':', contentInRow);
    contentArr.forEach((content) => {
      let cblock: ContentBlock = {
        id: content.id,
        ...content.data(),
      } as ContentBlock;
      contentInRow.push(cblock);
    });
    this.contentPerRow?.push(contentInRow);
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
    this.firestore.getContentForRow(rowId).then((contentArr) => {
      this.createWindowService.startCreator(rowId, contentArr.size);

      console.log(`begin edit in row ${rowId}`);
      // this.createWindowService.showWindow = true;
      // this.createWindowService.rowId = rowId;
      this.getContentForRow(rowId, contentArr);
    });

    // this.createWindowService.order =
  }

  titleInput: FormControl = new FormControl(
    this.firestore.selectedWorkDoc?.title,
  );
  subtitleInput: FormControl = new FormControl(
    this.firestore.selectedWorkDoc?.subtitle,
  );
  featureImageInput: FormControl = new FormControl(
    this.firestore.selectedWorkDoc?.featureImage,
  );
  featureBodyInput: FormControl = new FormControl(
    this.firestore.selectedWorkDoc?.featureBody,
  );

  async toggleWorkdocEdit() {
    this.editMode = !this.editMode;
    const _title = this.titleInput.value;
    const _subtitle = this.subtitleInput.value;
    const _featureImg = this.featureImageInput.value;
    const _featureBody = this.featureBodyInput.value;

    this.titleInput = new FormControl(this.firestore.selectedWorkDoc?.title);
    this.subtitleInput = new FormControl(
      this.firestore.selectedWorkDoc?.subtitle,
    );
    this.featureImageInput = new FormControl(
      this.firestore.selectedWorkDoc?.featureImage,
    );
    this.featureBodyInput = new FormControl(this.formatFeatureBodyForInput());

    // update on editmode disable
    if (this.editMode == false) {
      const workdoc: WorkDoc = this.firestore.selectedWorkDoc!;

      workdoc.title = _title;
      workdoc.subtitle = _subtitle;
      workdoc.featureImage = _featureImg;
      workdoc.featureBody = _featureBody.replaceAll('\n', '<br>');

      this.firestore.updateWorkDoc(workdoc);
    }
  }

  formatFeatureBodyForInput() {
    return this.firestore.selectedWorkDoc!.featureBody.replaceAll('<br>', '\n');
  }
  formatFeatureBodyForDisplay() {
    const linebreaks =
      this.firestore.selectedWorkDoc!.featureBody.split('<br>');
    linebreaks.forEach((line, index) => {
      let newline = "<span class='tabline'></span>" + line;
      linebreaks[index] = newline;
    });

    const newString = linebreaks.join('<br>');

    return newString;
  }

  async addEmptyRow() {
    this.firestore
      .addEmptyRow(this.selectedItem?.workdoc!, this.contentPerRow!.length)
      .then(() => {});
  }
}
