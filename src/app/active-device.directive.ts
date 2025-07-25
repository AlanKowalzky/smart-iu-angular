import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appActiveDevice]',
  standalone: true
})
export class ActiveDeviceDirective implements OnChanges {
  @Input('appActiveDevice') isActive: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isActive']) {
      if (this.isActive) {
        this.renderer.addClass(this.el.nativeElement, 'active-highlight');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'active-highlight');
      }
    }
  }
}
