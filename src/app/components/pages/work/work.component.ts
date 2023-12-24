import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { WorkDoc, Item, FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translate(0,0);' })),
      transition('void => *', [

        animate(200, style({ opacity: 1, transform: 'translate(0,0)' }))
      ]),
      transition('* => void', [
        animate(200, style({ opacity: 0, transform: 'translate(50%,0)' }))
      ])
    ])

  ]
})
export class WorkComponent {
  leftcontainer: any[];
  rightcontainer: any[];
  selected: boolean = false;
  selectedItem?: Item;

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
        }, 100)
      }
    }
    // nothing selected, select if exists
    else {
      if (item != undefined) {
        this.firestore.getWorkDoc(item.workdoc);
        setTimeout(() => {
          this.selected = true;
          this.selectedItem = item;
        }, 100)
      }
      else this.selected = false;
    }


  }
}
