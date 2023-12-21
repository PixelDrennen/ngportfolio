import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

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
  selected: boolean = true;
  constructor() {
    this.leftcontainer = Array(2).fill(10);
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



  public select() {
    this.selected = !this.selected;
  }
}
