import { ElementRef } from '@angular/core';
import { ActiveDeviceDirective } from './active-device.directive';

describe('ActiveDeviceDirective', () => {
  it('should create an instance', () => {
    const mockElement = { nativeElement: document.createElement('div') } as ElementRef;
    const directive = new ActiveDeviceDirective(mockElement);
    expect(directive).toBeTruthy();
  });
});