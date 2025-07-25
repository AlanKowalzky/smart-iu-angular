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
          { type: 'sensor', icon: 'thermostat', label: 'Temperature', value: { amount: 18.7, unit: '°C' } },
          { type: 'sensor', icon: 'water_drop', label: 'Humidity', value: { amount: 80.78, unit: '%' } },
          { type: 'sensor', icon: 'cloud', label: 'Forecast', value: { amount: 0, unit: 'Cloudy' } }
        ]
      },
      {
        id: 'bathroom-occupancy',
        title: 'Bathroom',
        layout: 'verticalLayout',
        items: [
          { type: 'sensor', icon: 'home', label: 'Occupancy', value: { amount: 0, unit: 'Clear' } },
          { type: 'sensor', icon: 'visibility', label: 'Presence keep time', value: { amount: 0, unit: 'min' } }
        ]
      },
      {
        id: 'vacuum-charger',
        title: 'Vacuum Cleaner Charger',
        layout: 'verticalLayout',
        items: [
          { type: 'device', icon: 'power_settings_new', label: 'Switch', state: true },
          { type: 'sensor', icon: 'power', label: 'Power', value: { amount: 0, unit: 'W' } },
          { type: 'sensor', icon: 'link', label: 'Current', value: { amount: 0.00, unit: 'A' } },
          { type: 'sensor', icon: 'bolt', label: 'Voltage', value: { amount: 240, unit: 'V' } }
        ]
      },
      {
        id: 'desktop-pc',
        title: 'Desktop PC',
        layout: 'singleDevice',
        items: [
          { type: 'device', icon: 'desktop_windows', label: 'Desktop PC', state: true }
        ]
      }
    ]
  },
  {
    id: 'lights',
    title: 'Lights',
    cards: [
      {
        id: 'hallway-lights',
        title: 'Hallway',
        layout: 'verticalLayout',
        items: [
          { type: 'device', icon: 'light', label: 'Light', state: true }
        ]
      },
      {
        id: 'kitchen-lights',
        title: 'Kitchen',
        layout: 'verticalLayout',
        items: [
          { type: 'device', icon: 'light', label: 'Light', state: true },
          { type: 'device', icon: 'lightbulb', label: 'LED', state: true }
        ]
      },
      {
        id: 'living-room-lights',
        title: 'Living Room',
        layout: 'verticalLayout',
        items: [
          { type: 'device', icon: 'light', label: 'Light', state: true },
          { type: 'device', icon: 'light', label: 'Lamp', state: true }
        ]
      },
      {
        id: 'bathroom-light',
        title: 'Bathroom',
        layout: 'verticalLayout',
        items: [
          { type: 'device', icon: 'light', label: 'Light', state: true }
        ]
      },
      {
        id: 'bedroom-lights',
        title: 'Bedroom',
        layout: 'verticalLayout',
        items: [
          { type: 'device', icon: 'light', label: 'Light', state: true },
          { type: 'device', icon: 'light', label: 'Left Lamp', state: true },
          { type: 'device', icon: 'light', label: 'Right Lamp', state: true }
        ]
      }
    ]
  }
];