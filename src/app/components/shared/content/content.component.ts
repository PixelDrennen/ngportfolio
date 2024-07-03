import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  SecurityContext,
  EventEmitter,
} from '@angular/core';
import { CONTENT_TYPES, GlobalService } from 'src/app/services/global.service';
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
import { CrudService } from 'src/app/services/admin/crud.service';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { CreateWindowService } from 'src/app/services/admin/crud/create-window.service';
import { EditWindowService } from 'src/app/services/admin/crud/edit-window.service';
import { ContentModalManagerService } from 'src/app/services/content-modal-manager.service';

const themeGithub = 'assets/github-dark.css';
const themeAtomOneDark = 'assets/atom-one-dark.css';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  badContent: boolean = false;
  contentTypes = CONTENT_TYPES;
  @Input() contentValue?: string;
  @Input() contentMetadata?: string;
  @Input() contentType?: string;
  @Input() contentBlock?: ContentBlock;
  @Input() element?: ElementRef;
  @Input() lockRow?: EventEmitter<boolean>;

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
    public crudService: CrudService,
    public userAuth: UserAuthService,
    public global: GlobalService,
    // public createWindowService:CreateWindowService,
    public editWindowService: EditWindowService,
    private contentModalService:ContentModalManagerService,
  ) {
    this.hljsLoader.setTheme(this.currentTheme);
  }

  @Input() public allowAdminControls: boolean = true;

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
    let mytooltip: MatTooltip = event as MatTooltip;
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

  init: boolean = false;
  ngOnInit(): void {
    this.contentURL = this.contentValue!;
    this.checkContent();
  }
  // @Input() contentId?:string;

  updateContent(val: string) {
    this.badContent = false;
    this.contentURL = val;
    this.contentValue = val;
  }

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

  isContentPreviewEnabled() {
    switch (this.contentType) {
      case CONTENT_TYPES.IMAGE || CONTENT_TYPES.MODEL:
        return true;
      default:
        return false;
    }
  }
  getContentTrimmed() {
    return this.contentValue!.trim();
  }

  contentError(error: any) {
    this.badContent = true;
    console.log('error:', error);
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

    // let w = `${this.contentBlock!.meta.width}% !important`;
    // let h = `${this.contentBlock!.meta.height}% !important`;
    // el.style.width = w;
    // el.style.height = h;
    // if (content.meta.wAuto) img.style.width = 'auto !important';
    // if (content.meta.hAuto) img.style.height = 'auto !important';
    console.log('setting width, height to:', el.style.width, el.style.height);
  }

  beginEdit() {
    console.log('begin edit');
    this.editWindowService.selectedContent = this.contentBlock!;
    this.editWindowService.showWindow = true;
  }

  showPreview(){
    console.log(`preview for ${this.contentBlock!.id}`)
    this.contentModalService.setSelectedContent(this.contentBlock!.id);
    this.contentModalService.open();
  }

  openURL(url?:string){
    if(url){
      window.open(url);
    }
  }
}
