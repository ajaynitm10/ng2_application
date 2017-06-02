import {Component, Input, Output, EventEmitter} from '@angular/core';
import { IEvent } from './shared/event.model'

@Component({
    selector:'events-thumbnail',
    template : `
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