import { Component } from '@angular/core';
import { CONTENT_TYPES } from 'src/app/services/global.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  public contentTypes = CONTENT_TYPES;
  public contentValue?: string;
  public contentType?: string;

}
