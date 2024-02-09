import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StorageService } from 'src/app/services/firebase/storage.service';
import { CONTENT_TYPES } from 'src/app/services/global.service';

@Component({
  selector: 'app-image-creator-window',
  templateUrl: './image-creator-window.component.html',
  styleUrl: './image-creator-window.component.scss',
})
export class ImageCreatorWindowComponent {
  constructor(private storage: StorageService) {}
  // contentTypes = CONTENT_TYPES;
  // @Input() selectedOption: string = '';
  @Input() imageURLEmitter: EventEmitter<string> = new EventEmitter();

  isURLInput: FormControl = new FormControl(false);
  imageURL: FormControl = new FormControl('');
  // imageUploadFile: FormControl = new FormControl(null);
  imageUploadFile: File | null = null;

  submit() {
    console.log(this.imageURL.value);
    if (this.isURLInput.value == true) {
      this.imageURLEmitter.emit(this.imageURL.value);
    } else {
      // upload image to firebase storage and get url
      if (this.imageUploadFile) this.uploadImage();
    }
  }
  onImageChanged(event: any) {
    this.imageUploadFile = event.target.files[0];
  }

  async uploadImage() {
    this.storage.uploadEvent.subscribe((a) => {
      console.log(`Got url in creator window ${a}`);
      this.imageURLEmitter.emit(a);
    });

    this.storage.uploadImage(this.imageUploadFile!);
  }
}
