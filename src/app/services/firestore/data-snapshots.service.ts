import { Injectable } from '@angular/core';
import { FirestoreService } from '../firebase/firestore.service';
import { Observable, firstValueFrom } from 'rxjs';
import {
  DocumentData,
  collection,
  collectionChanges,
  collectionData,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';

export interface RowObject {
  rowId: string;
  rowData$: Observable<DocumentData[]>;
}

@Injectable({
  providedIn: 'root',
})
export class DataSnapshotsService {
  constructor(private firestore: FirestoreService) {}

  // goal: use the firestore service for subscriptions to snapshotCHANGES. Do NOT refresh the page EVER unless absolutely necessary.
  // TODO: item snapshot subscription
  // TODO: workdoc snapshot subscription
  // TODO: row snapshot subscription
  // TODO: content snapshot subscription

  // ? TEST: reads per page load
  // ? TEST: reads per workdoc fully load (rows, content, etc.)

  // * DESIRED FEATURE: all text on page editable
  // * DESIRED FEATURE: all content updates automatically on-change
  // * DESIRED FEATURE: store loaded content locally as json and reuse for refresh, then subscribe to changes

  //? > Never changes
  // collection of all items
  itemCollection$?: Observable<DocumentData[]>;

  //? > Changes every new work doc
  // selected workdoc (there will only ever be one displayed)
  selectedWorkdoc$?: Observable<DocumentData>;

  //? > Changes every new work doc
  // rows in the selected workdoc
  rowsInWorkdoc$?: Observable<DocumentData[]>;

  //? > Changes every new work doc
  // content in rows (array of content arrays)
  rowData$?: RowObject[];

  /*
  @param none
  */
  subscribe_ItemCollection() {
    const q = query(collection(this.firestore.db, 'items'));
    const col = collectionData(q, { idField: 'id' });
    this.itemCollection$ = col;
  }

  subscribe_SelectedWorkdoc(workdocID: string) {
    const q = query(
      collection(this.firestore.db, 'workdocs'),
      where('id', '==', workdocID),
    );
    const col = collectionData(q, { idField: 'id' });
    this.selectedWorkdoc$ = col;
  }

  subscribe_RowsInWorkdoc(workdocID: string) {
    const q = query(
      collection(this.firestore.db, 'workdocs'),
      where('workdoc', '==', workdocID),
    );
    const col = collectionData(q, { idField: 'id' });
    this.rowsInWorkdoc$ = col;
  }

  async subscribe_ContentInRows() {
    if (this.rowsInWorkdoc$ == undefined) {
      console.log('subscribe_ContentInRows: rowsInWorkdoc$ is undefined');
      return;
    }

    const rows = await firstValueFrom(this.rowsInWorkdoc$);
    rows.forEach((row) => {
      const rowId = row['id'];
      const q = query(
        collection(this.firestore.db, 'content'),
        where('row', '==', rowId),
      );
      const rowData = collectionData(q, { idField: 'id' });
      this.storeRow(rowData, rowId);
    });
  }

  storeRow(rowData: Observable<DocumentData[]>, id: string) {
    let rowObj: RowObject = { rowId: id, rowData$: rowData };
    if (this.rowData$ == undefined) this.rowData$ = [];

    this.rowData$.push(rowObj);
  }
}
