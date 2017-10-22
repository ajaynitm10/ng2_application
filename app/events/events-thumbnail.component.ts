import {Component, Input, Output, EventEmitter} from '@angular/core';
import { IEvent } from './shared/event.model'
import { TranslateService } from '../translate/translate.service';

@Component({
    selector:'events-thumbnail',
    template : `
        <h4>Translate: Hello World</h4>
        <h6>{{'hello world' | translate }}
        <h6>{{ checkingVal | translate }}
        <div class="btn-group">
            <button *ngFor="let lang of supportedLangs"
            (click)="selectLang(lang.value)"
            class="btn btn-default" [class.btn-primary]="isCurrentLang(lang.value)">
            {{ lang.display }}
            </button>
        </div>
        <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
            <h2>{{event.name | uppercase}}</h2>
            <div>Date: {{event?.date | date:'shortDate'}}</div>
            <div [ngClass]="getStartTimeClass()" [ngSwitch]="event?.time">
                Time: {{event?.time}}
                <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
                <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
                <span *ngSwitchDefault>(Normal Start)</span>
            </div>
            <div>Price: {{event?.price | currency:'INR':true}}</div>
            <div *ngIf="event?.location">
                <span>Location:{{event?.location?.address}}</span>
                <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
            </div>
            <div *ngIf="event?.onlineUrl">
            Online Url :{{event.onlineUrl}}
            </div>
        </div>`,
    styles:[`
        .green { color: #003300 !important;}
        .bold { font-weight: bold;}
        .thumbnail { min-height:210px;} 
        .pad-left { margin-left: 10px;}
        .well div { color: #bbb;}   
    `]
})

export class EventsThumbnailComponent{
   @Input() event: IEvent

    public translatedText: string;
    public supportedLanguages: any[];
    public supportedLangs = [];
    checkingVal: string;
    constructor(private _translate: TranslateService) { }

    ngOnInit() {
      // standing data
      this.supportedLangs = [
        { display: 'English', value: 'en' },
        { display: 'Español', value: 'es' },
        { display: '华语', value: 'zh' },
      ];
      
      this.checkingVal = 'hello ng2';
      this.selectLang('es');
      
        
    }
    
    isCurrentLang(lang: string) {
      return lang === this._translate.currentLang;
    }
    
    selectLang(lang: string) {
      // set default;
      this._translate.use(lang);
      this.refreshText();
    }
    
    refreshText() {
      this.translatedText = this._translate.instant('hello world');
    }

   getStartTimeClass(){
       const isEarlySatrt = this.event && this.event.time === '8:00 am'
       return {green : isEarlySatrt, bold : isEarlySatrt}
    // we can write above code as below  
    //  if(this.event && this.event.time === '8:00 am'){
    //        return ['green', 'bold']
    //     return []
    //    }
    //    if(this.event && this.event.time === '8:00 am'){
    //        return 'green', 'bold'
    //     return ''
    //    }
    // we can use ngStyle as same
    // in template we have used routerLink to route to a particular element. This routerLink is an array and it takes url, followed by parametrs 
   }
}
