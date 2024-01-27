import { Component } from '@angular/core';

@Component({
  selector: 'app-workdoc-creator',
  templateUrl: './workdoc-creator.component.html',
  styleUrls: ['./workdoc-creator.component.scss'],
})
export class WorkdocCreatorComponent {
  OpenEditor() {
    console.log('clicked');
  }
}
