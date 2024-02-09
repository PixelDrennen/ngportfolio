import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  WorkDoc,
  Item,
  FirestoreService,
  Collaborator,
} from 'src/app/services/firebase/firestore.service';
import { SummaryboxComponent } from '../../overlays/summarybox/summarybox.component';
import {
  Highlight,
  HighlightAutoResult,
  HighlightJS,
  HighlightLoader,
} from 'ngx-highlightjs';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { CreateWindowService } from 'src/app/services/admin/crud/create-window.service';
import { firstValueFrom, tap } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';

const themeGithub = 'assets/github-dark.css';
const themeAtomOneDark = 'assets/atom-one-dark.css';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
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
export class WorkComponent {
  leftcontainer: any[];
  rightcontainer: any[];
  selected: boolean = false;
  selectedItem?: Item;
  @ViewChild(SummaryboxComponent) summarybox!: SummaryboxComponent;

  constructor(
    public firestore: FirestoreService,
    private hljs: HighlightJS,
    public userAuth: UserAuthService,
    private hljsLoader: HighlightLoader,
    public global: GlobalService,
    public createWindowService: CreateWindowService,
  ) {
    this.selected = localStorage.getItem('itemIsSelected') === 'true';
    if (this.selected) this.getItemsOnce();

    // this.firestore.itemCol$.pipe(
    //   tap((item) => {
    //     item.forEach((item) => {
    //       if (item.id == localStorage.getItem('selectedItemId'))
    //         this.select(item);
    //     });
    //   }),
    // );
    // .forEach((item) => {
    // });

    // hljs.highlightAll();
    // hljs.initLineNumbersOnLoad();
    hljs.lineNumbersBlock(document.querySelector('.linenums')!);
    this.leftcontainer = Array(0).fill(10);
    this.rightcontainer = Array(4).fill(10);

    const workboxes = document.querySelectorAll('.workbox');
    const summarybox: any = document.querySelector('.summarybox');
    if (workboxes.length > 0) {
      const lastWorkbox: any = workboxes[workboxes.length - 1];
      const workboxwidth = lastWorkbox.offsetWidth;
      const workboxLeft = lastWorkbox.getBoundingClientRect().left;

      summarybox.style.marginLeft = `${workboxLeft + workboxwidth}px`;
    }

    // setTimeout(() => {

    //   this.changeTheme();
    // }, 5000);
    this.hljsLoader.setTheme(this.currentTheme);
  }

  async getItemsOnce() {
    const _items = await firstValueFrom(this.firestore.itemCol$);
    const _selectedItem = _items.find(
      (item) => item.id == localStorage.getItem('selectedItemId'),
    );
    if (_selectedItem) { this.select(_selectedItem); console.log(`Item selected: ${_selectedItem.id}`)}
    else console.log(`Could not find item with id ${localStorage.getItem('selectedItemId')}`);
  }

  currentTheme: string = themeGithub;
  response!: HighlightAutoResult;
  onHighlight(e: HighlightAutoResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: '{...}',
      value: '{...}',
    };
  }

  // "node_modules/highlight.js/a11y-dark.css",
  //             "node_modules/highlight.js/styles/github.css",
  //             "node_modules/highlight.js/styles/atom-one-dark.css"

  changeTheme() {
    console.log('current theme:', this.currentTheme);

    this.currentTheme =
      this.currentTheme === themeGithub ? themeAtomOneDark : themeGithub;
    this.hljsLoader.setTheme(this.currentTheme);

    console.log('new theme:', this.currentTheme);
  }

  onKeyUp(event: any) {
    // console.log("key pressed");
    // if (event.key == 'Escape') {
    if (this.selected) {
      this.select(undefined);
    }
    // }
  }

  public SplitBodyInTwo(body?: string) {
    if (body != undefined) {
      if (body.length < 400) return [body, ''];

      let indexAtNextspace = 0;

      let len = body.length;
      let halfLen = Math.floor(len / 2);

      for (let i = halfLen; i < len; i++) {
        if (body[i] == '.') {
          halfLen = i;
          break;
        }
      }

      let first = body.slice(0, halfLen + 1);
      let second = body.slice(halfLen + 1, len);

      let both = [first, second];
      return both;
    } else return ['undefined', 'undefined'];
  }

  public select(item?: Item) {
    // something is already selected
    if (this.selected) {
      // we clicked the same item currently selected, so deselect especially when item is undefined
      if (this.selectedItem == item || item == undefined) {
        this.selectedItem = undefined;
        this.selected = false;
      }
      // the clicked item is different than our current item, so switch to that one
      else {
        this.selectedItem = item;
        this.firestore.getWorkDoc(item.workdoc);

        this.selected = false;
        setTimeout(() => {
          this.selected = true;
          this.onSelected();
        }, 100);
      }
    }
    // nothing selected, select if exists
    else {
      if (item != undefined) {
        this.firestore.getWorkDoc(item.workdoc);
        setTimeout(() => {
          this.selected = true;
          this.selectedItem = item;
          this.onSelected();
        }, 100);
      } else this.selected = false;
    }
  }
  private onSelected() {
    setTimeout(() => {
      (document.querySelector('.summarybox') as HTMLElement).focus();
      if (this.selectedItem) {
        console.log(`Saving selected item ${this.selectedItem.id}`)
        localStorage.setItem('selectedItemId', this.selectedItem.id);
        localStorage.setItem('itemIsSelected', this.selected.toString());
        this.summarybox.update();
      } else console.log('selected item is undefined.');
    }, 500);
  }
}
