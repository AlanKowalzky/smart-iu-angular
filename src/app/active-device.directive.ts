import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appActiveDevice]',
  standalone: true
})
export class ActiveDeviceDirective implements OnChanges {
  @Input('appActiveDevice') isActive = false;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.el.nativeElement.style.filter = this.isActive ? 'drop-shadow(0 0 8px #2196f3)' : '';
  }
}
