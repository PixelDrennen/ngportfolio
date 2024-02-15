import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-creator-window',
  templateUrl: './text-creator-window.component.html',
  styleUrl: './text-creator-window.component.scss',
})
export class TextCreatorWindowComponent {
  @Input() valueEmitter: EventEmitter<string> = new EventEmitter();
  textValue: FormControl = new FormControl('Write some text!');

  submit() {
    this.valueEmitter.emit(this.textValue.value);
  }
}
