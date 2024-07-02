import { Component, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-video-creator',
  templateUrl: './video-creator.component.html',
  styleUrl: './video-creator.component.scss'
})
export class VideoCreatorComponent {
  @Input() valueEmitter: EventEmitter<string> = new EventEmitter();
  textValue: FormControl = new FormControl('Write some text!');

  submit() {
    this.valueEmitter.emit(this.textValue.value);
  }
}
