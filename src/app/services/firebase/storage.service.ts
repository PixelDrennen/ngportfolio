import { Injectable } from '@angular/core';
import { getStorage, ref, listAll } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage:any = getStorage();
  listRef:any = ref(this.storage, 'images/uid');
  
  getImage(name:string){
    const ref = this.storage.ref(`images/${name}`);
    let img; 
    ref.getDownloadURL().subscribe(data =>{
      img = data
    });
    return img;
  }
  
  constructor() { }
  
  
}
