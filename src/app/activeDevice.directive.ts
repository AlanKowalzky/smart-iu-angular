import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, inject } from '@angular/core';

@Directive({
  selector: '[appActiveDevice]',
  standalone: true
})
export class ActiveDeviceDirective implements OnChanges {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  @Input('appActiveDevice') isActive = false;

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
