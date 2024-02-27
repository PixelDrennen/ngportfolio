import { Component, EventEmitter, Output } from '@angular/core';
import { CreateWindowService } from 'src/app/services/admin/crud/create-window.service';
import { CONTENT_TYPES } from 'src/app/services/global.service';
@Component({
  selector: 'app-content-option-box',
  templateUrl: './content-option-box.component.html',
  styleUrl: './content-option-box.component.scss',
})
export class ContentOptionBoxComponent {
  constructor(private windowCreate:CreateWindowService){}
  contentTypes = CONTENT_TYPES;

  @Output() optionSelected = new EventEmitter<string>();

  onOptionSelected(option: string) {
    if(option == CONTENT_TYPES.DOWNLOAD){this.windowCreate.acceptedExtensions = '*';}
    this.optionSelected.emit(option);

    
  }
}
