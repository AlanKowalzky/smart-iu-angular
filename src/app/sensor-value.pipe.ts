import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sensorValue',
  standalone: true
})
export class SensorValuePipe implements PipeTransform {
  transform(value: { amount: number; unit: string }): string {
    return `${value.amount} ${value.unit}`;
  }
}
