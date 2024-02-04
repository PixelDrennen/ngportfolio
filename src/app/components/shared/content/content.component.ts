import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CONTENT_TYPES } from 'src/app/services/global.service';
import { getStorage, ref, getDownloadURL } from '@angular/fire/storage';
import { ContentBlock } from 'src/app/services/firebase/firestore.service';
import { SafePipe } from 'src/app/pipes/youtube/safe.pipe';
import { SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, AfterViewInit {

  contentTypes = CONTENT_TYPES;
  @Input() contentValue?: string;
  @Input() contentType?: string;
  @Input() contentBlock?: ContentBlock;
  @Input() element?: ElementRef;

  storage = getStorage();

  contentURL: string = '';
  safeURL: SafeResourceUrl = '';

  nativeEl: HTMLElement = this.elementRef.nativeElement;

  constructor(private elementRef: ElementRef, public safePipe:SafePipe) {}
  ngAfterViewInit(): void {


    // this.setWidthOfImage(this.imgElement.nativeElement, yourContent);
    // this.contentURL = this.contentValue!;
    // this.checkContent();
    if (!this.init) {
      const interval = setInterval(() => {
        if (this.init) {
          clearInterval(interval);
          this.setWidthOfImage();
          this.init = false;
        }
      }, 200);
    } else this.setWidthOfImage();
  }
  init: boolean = false;
  ngOnInit(): void {
    this.contentURL = this.contentValue!;
    this.checkContent();
  }
  // @Input() contentId?:string;

  checkContent() {
    console.log('checking content for', this.contentType);
    if (this.contentType == this.contentTypes.IMAGE) {
      if (this.contentValue?.startsWith('gs://')) {
        // obtain firebase link from firebase storage
        const gsRef = ref(this.storage, this.contentValue);
        getDownloadURL(gsRef).then((url) => {
          this.contentURL = url;
          console.log('url:', url);
          this.init = true;

          // this.setWidthOfImage();
        });
      }
    }

    if(this.contentType == this.contentTypes.VIDEO){
      this.safeURL = this.safePipe.transform(this.contentURL, 'resourceUrl');
    }
  }

  setWidthOfImage() {
    // this.elementRef.nativeElement.querySelector(`#${this.contentBlock!.id}`)
    const el = this.elementRef.nativeElement.querySelector(`#${this.contentBlock!.id}`);
    console.log('setting width for element', el);
    
    if (el == undefined) {
      console.log('nativeEl was undefined.', this.contentBlock);
      return;
    }

    if (el.style == undefined) {
      console.log('Img style was undefined.', this.contentBlock);
      return;
    }
    console.log(
      'css:',
      el.css
    );

    let w = `${this.contentBlock!.meta.width}% !important`;
    let h = `${this.contentBlock!.meta.height}% !important`;
    el.style.width = w;
    el.style.height = h;
    // if (content.meta.wAuto) img.style.width = 'auto !important';
    // if (content.meta.hAuto) img.style.height = 'auto !important';
    console.log(
      'setting width, height to:',
      el.style.width,
      el.style.height
    );
  }
}
