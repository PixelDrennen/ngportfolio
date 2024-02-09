import { EventEmitter, Injectable } from '@angular/core';
import {
  getStorage,
  ref,
  listAll,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage: any = getStorage();
  listRef: any = ref(this.storage, 'images/uid');

  getImage(name: string) {
    const ref = this.storage.ref(`images/${name}`);
    let img;
    ref.getDownloadURL().subscribe((data: any) => {
      img = data;
    });
    return img;
  }

  uploadEvent: EventEmitter<string> = new EventEmitter<string>();

  uploadImage(file: File) {
      console.log(`File being uploaded: ${file}`);
      if (file) {
      console.log("Starting upload.");
      const storageRef = ref(this.storage, `images/${file.name}`);
      uploadBytesResumable(storageRef, file).then((snapshot) => {
        if (snapshot.state == 'running')
          console.log(
            `bytes uploaded: ${snapshot.bytesTransferred} / ${snapshot.totalBytes}`,
          );
        if (snapshot.state == 'success') {
          console.log('upload success');
          getDownloadURL(snapshot.ref).then((url) => {
            console.log(`got url for file: ${url}`)
            this.uploadEvent.emit(url);
          });
        }
      });
    }
  }

  constructor() {}
}
