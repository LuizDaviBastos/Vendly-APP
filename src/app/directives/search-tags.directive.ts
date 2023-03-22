import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector:'[searchTag]'
})
export class SearchTagsDirective {
    constructor(private el: ElementRef) { }

    @HostListener('onkeyup') onMouseEnter() {
        let message = (<HTMLTextAreaElement>this.el.nativeElement).innerHTML;
        (<HTMLTextAreaElement>this.el.nativeElement).innerHTML = message.replace('@COMPRADOR', "<h1>Comprador</h1>")
    }
  
    @HostListener('mouseleave') onMouseLeave() {
    }
}