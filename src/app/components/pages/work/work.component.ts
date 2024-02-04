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

  constructor(public firestore: FirestoreService) {
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
      if (this.selectedItem) this.summarybox.update();
      else console.log("selected item is undefined.")
    }, 500);
  }
}
