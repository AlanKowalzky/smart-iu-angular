import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sensorValue',
  standalone: true
})
export class SensorValuePipe implements PipeTransform {
  transform(value: { amount: number; unit: string } | null | undefined): string {
    if (!value) {
      return '';
    }

    if (value.unit === 'clear') { 
      return 'Clear';
    } else if (value.unit) {
        return `${value.amount} ${value.unit}`;
    } else {
        return `${value.amount}`; 
    }
  }
}
