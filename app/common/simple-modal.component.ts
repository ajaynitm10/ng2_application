import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core'
import { jQuery_Token } from './index'
@Component({
    selector: 'simple-modal',
    template: `
    <div id="{{elementId}}" #modalContainer class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                    <h4 class="modal-title">{{title}}</h4>
                </div>
                <div class="modal-body" (click)="closeModal()">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    </div>
    `,
    styles:[`
        .modal-body { height: 250px; overflow-y: scroll; }
    `]
})

export class SimpleModalComponent {
    @Input() title: string;
    @Input() elementId: string;
    @Input() closeOnBodyClick: string;
    @ViewChild('modalContainer') containerEl: ElementRef

    constructor(@Inject(jQuery_Token) private $: any){

    }
    closeModal(){
        if(this.closeOnBodyClick.toLocaleLowerCase() === "true"){
            this.$(this.containerEl.nativeElement).modal('hide');
        }
    }
}

// ViewChild is used for single node element.
//ViewChildlren is used for bunch of element or collection
//ContentChild is used for ng-content
//ContentChildren is used for bunch of ng-content