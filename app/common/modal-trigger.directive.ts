import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core'
import { jQuery_Token } from './index'

@Directive({
    selector: '[modal-trigger]',
})

export class ModalTriggerDirective implements OnInit {
    private el:HTMLElement
    @Input('modal-trigger') modalId: string;

    constructor(ref: ElementRef, @Inject(jQuery_Token) private $: any){
        this.el = ref.nativeElement;
    }

    ngOnInit() {
        this.el.addEventListener('click', e => {
            this.$(`#${this.modalId}`).modal({})
        })
    }
}