import { Component, Input, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { getDownloadURL, getStorage, ref } from '@angular/fire/storage';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatTooltip } from '@angular/material/tooltip';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HighlightAutoResult, HighlightLoader } from 'ngx-highlightjs';
import { SafePipe } from 'src/app/pipes/youtube/safe.pipe';
import { CrudService } from 'src/app/services/admin/crud.service';
import { EditWindowService } from 'src/app/services/admin/crud/edit-window.service';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { CONTENT_TYPES, GlobalService } from 'src/app/services/global.service';
const themeGithub = 'assets/github-dark.css';
const themeAtomOneDark = 'assets/atom-one-dark.css';
@Component({
  selector: 'app-content-as-firestore',
  templateUrl: './content-as-firestore.component.html',
  styleUrl: './content-as-firestore.component.scss',
})
export class ContentAsFirestoreComponent implements OnInit {

  init: boolean = false;
  ngOnInit(): void {
    // this.contentURL = this.contentValue!;
    this.checkContent();
  }

  contentTypes:any = CONTENT_TYPES;
  badContent: boolean = false;

  storage = getStorage();

  contentURL: string = '';
  safeURL: SafeResourceUrl = '';


  constructor(
    // private elementRef: ElementRef,
    public safePipe: SafePipe,
    private hljsLoader: HighlightLoader,
    public sanitizer: DomSanitizer,
    private clipboard: Clipboard,
    public crudService:CrudService,
    public userAuth:UserAuthService,
    public global:GlobalService,
    // public createWindowService:CreateWindowService,
    public editWindowService:EditWindowService,
  ) {
    this.hljsLoader.setTheme(this.currentTheme);
  }




  @Input() content?:DocumentData;
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
    this.clipboard.copy(this.content!['value'].replaceAll('<br>', '\n'));

    this.copyTextTooltip = 'copied!';
    setTimeout(() => {
      mytooltip.hide();
      setTimeout(() => {
        
        this.copyTextTooltip = 'copy';
      }, 500);
    }, 1000);
  }

 
  updateContent(val:string){
    this.badContent = false;
    this.content!['value'] = val;
  }
  checkContent() {
    console.log('checking content for', this.content!['type']);
    if (this.content!['type'] == this.contentTypes.IMAGE) {
      if (this.content!['value'].startsWith('gs://')) {
        // obtain firebase link from firebase storage
        const gsRef = ref(this.storage, this.content!['value']);
        getDownloadURL(gsRef).then((url) => {
          this.contentURL = url;
          console.log('url:', url);
          this.init = true;

          // this.setWidthOfImage();
        });
      }
    }

    if (this.content!['type'] == this.contentTypes.VIDEO) {
      this.safeURL = this.safePipe.transform(this.contentURL, 'resourceUrl');
    }
  }
  getContentTrimmed() {
    return this.content!['value'].trim();
  }
  contentError(error:any){
    this.badContent = true;
    console.log('error:', error);

  }
}
