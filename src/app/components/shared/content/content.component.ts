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
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { HighlightModule } from 'ngx-highlightjs';
import {
  Highlight,
  HighlightAutoResult,
  HighlightJS,
  HighlightLoader,
} from 'ngx-highlightjs';
import { Clipboard } from '@angular/cdk/clipboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltip } from '@angular/material/tooltip';

const themeGithub = 'assets/github-dark.css';
const themeAtomOneDark = 'assets/atom-one-dark.css';
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

  constructor(
    private elementRef: ElementRef,
    public safePipe: SafePipe,
    private hljsLoader: HighlightLoader,
    public sanitizer: DomSanitizer,
    private clipboard: Clipboard,
  ) {
    this.hljsLoader.setTheme(this.currentTheme);
  }
  currentTheme: string = themeGithub;
  response!: HighlightAutoResult;
  onHighlight(e: HighlightAutoResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: '{...}',
      value: '{...}',
    };
  }
  changeTheme() {
    console.log('current theme:', this.currentTheme);

    this.currentTheme =
      this.currentTheme === themeGithub ? themeAtomOneDark : themeGithub;
    this.hljsLoader.setTheme(this.currentTheme);

    console.log('new theme:', this.currentTheme);
  }

  copyTextTooltip: string = 'copy';


  copy(event: any) {
    let mytooltip:MatTooltip = event as MatTooltip;
    mytooltip.show();
    this.clipboard.copy(this.contentValue!.replaceAll('<br>', '\n'));

    this.copyTextTooltip = 'copied!';
    setTimeout(() => {
      mytooltip.hide();
      setTimeout(() => {
        
        this.copyTextTooltip = 'copy';
      }, 500);
    }, 1000);
  }

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

    if (this.contentType == this.contentTypes.VIDEO) {
      this.safeURL = this.safePipe.transform(this.contentURL, 'resourceUrl');
    }
  }
  getContentTrimmed() {
    return this.contentValue!.trim();
  }

  setWidthOfImage() {
    // this.elementRef.nativeElement.querySelector(`#${this.contentBlock!.id}`)
    const el = this.elementRef.nativeElement.querySelector(
      `#${this.contentBlock!.id}`,
    );
    console.log('setting width for element', el);

    if (el == undefined) {
      console.log('nativeEl was undefined.', this.contentBlock);
      return;
    }

    if (el.style == undefined) {
      console.log('Img style was undefined.', this.contentBlock);
      return;
    }
    console.log('css:', el.css);

    let w = `${this.contentBlock!.meta.width}% !important`;
    let h = `${this.contentBlock!.meta.height}% !important`;
    el.style.width = w;
    el.style.height = h;
    // if (content.meta.wAuto) img.style.width = 'auto !important';
    // if (content.meta.hAuto) img.style.height = 'auto !important';
    console.log('setting width, height to:', el.style.width, el.style.height);
  }
}
