import { Component, EventEmitter, Output } from '@angular/core';
import { CONTENT_TYPES } from 'src/app/services/global.service';
@Component({
  selector: 'app-content-option-box',
  templateUrl: './content-option-box.component.html',
  styleUrl: './content-option-box.component.scss',
})
export class ContentOptionBoxComponent {
  contentTypes = CONTENT_TYPES;

  @Output() optionSelected = new EventEmitter<string>();

  onOptionSelected(option: string) {
    this.optionSelected.emit(option);

    
  }
}
