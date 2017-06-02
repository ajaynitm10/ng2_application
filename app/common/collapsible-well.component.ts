import { Component, Input } from '@angular/core';

@Component({
    selector: 'collapsible-well',
    template: `
        <div (click)="toggleContent()" class="well pointable">
            <h4>
                <ng-content select="[well-title]"></ng-content>
            </h4>
            <ng-content *ngIf="visible" select="[well-body]"></ng-content>
        </div>
    `
})

export class CollapsibleWellComponent {
    visible: boolean = true;

    toggleContent(){
        this.visible = !this.visible;
    }
}

// The content inside the collapsible-well component will be shown by <ng-content></ng-content>
// well-title and well-body are attributes