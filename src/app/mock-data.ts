import { Tab } from './models';

export const MOCK_DATA: Tab[] = [
  {
    id: 'overview',
    title: 'Overview',
    cards: [
      {
        id: 'balcony-weather',
        title: 'Balcony',
        layout: 'horizontalLayout',
        items: [
          {
            type: 'sensor',
            icon: 'thermostat',
            label: 'Temperature',
            value: { amount: 18.5, unit: '°C' }
          },
          {
            type: 'sensor',
            icon: 'water_drop',
            label: 'Humidity',
            value: { amount: 72, unit: '%' }
          },
          {
            type: 'sensor',
            icon: 'cloud',
            label: 'Weather',
            value: { amount: 1, unit: 'clear' }
          }
        ]
      }
      // ...tu możesz dodać kolejne karty i taby zgodnie z pełnym mockiem
    ]
  }
  // ...tu możesz dodać kolejne taby
]; 