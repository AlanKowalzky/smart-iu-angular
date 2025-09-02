import { Tab } from './models';

const OVERVIEW_TABS: Tab[] = [
  {
    id: 'overview',
    title: 'Overview',
    cards: [
      {
        id: 'balcony-weather',
        title: 'Balcony',
        layout: 'horizontalLayout',
        items: [
          { id: 'balcony-weather-sensor-1', type: 'sensor', icon: 'thermostat', label: 'Temperature', value: { amount: 18.7, unit: '°C' } },
          { id: 'balcony-weather-sensor-2', type: 'sensor', icon: 'water_drop', label: 'Humidity', value: { amount: 80.78, unit: '%' } },
          { id: 'balcony-weather-sensor-3', type: 'sensor', icon: 'cloud', label: 'Forecast', value: { amount: 0, unit: 'Cloudy' } }
        ]
      },
      {
        id: 'bathroom-occupancy',
        title: 'Bathroom',
        layout: 'verticalLayout',
        items: [
          { id: 'bathroom-occupancy-sensor-1', type: 'sensor', icon: 'home', label: 'Occupancy', value: { amount: 0, unit: 'Clear' } },
          { id: 'bathroom-occupancy-sensor-2', type: 'sensor', icon: 'visibility', label: 'Presence keep time', value: { amount: 0, unit: 'min' } }
        ]
      },
      {
        id: 'vacuum-charger',
        title: 'Vacuum Cleaner Charger',
        layout: 'verticalLayout',
        items: [
          { id: 'vacuum-charger-device-1', type: 'device', icon: 'power_settings_new', label: 'Switch', state: true },
          { id: 'vacuum-charger-sensor-1', type: 'sensor', icon: 'power', label: 'Power', value: { amount: 0, unit: 'W' } },
          { id: 'vacuum-charger-sensor-2', type: 'sensor', icon: 'link', label: 'Current', value: { amount: 0.00, unit: 'A' } },
          { id: 'vacuum-charger-sensor-3', type: 'sensor', icon: 'bolt', label: 'Voltage', value: { amount: 240, unit: 'V' } }
        ]
      },
      {
        id: 'desktop-pc',
        title: 'Desktop PC',
        layout: 'singleDevice',
        items: [
          { id: 'desktop-pc-device-1', type: 'device', icon: 'desktop_windows', label: 'Desktop PC', state: true }
        ]
      }
    ]
  },
  {
    id: 'devices',
    title: 'Devices',
    cards: [
      {
        id: 'vacuum-charger-devices',
        title: 'Vacuum Cleaner Charger',
        layout: 'verticalLayout',
        items: [
          { id: 'vacuum-charger-device-2', type: 'device', icon: 'power_settings_new', label: 'Switch', state: true },
          { id: 'vacuum-charger-sensor-4', type: 'sensor', icon: 'power', label: 'Power', value: { amount: 0, unit: 'W' } },
          { id: 'vacuum-charger-sensor-5', type: 'sensor', icon: 'link', label: 'Current', value: { amount: 0.00, unit: 'A' } },
          { id: 'vacuum-charger-sensor-6', type: 'sensor', icon: 'bolt', label: 'Voltage', value: { amount: 240, unit: 'V' } }
        ]
      },
      {
        id: 'desktop-pc-devices',
        title: 'Desktop PC',
        layout: 'singleDevice',
        items: [
          { id: 'desktop-pc-device-2', type: 'device', icon: 'desktop_windows', label: 'Desktop PC', state: true }
        ]
      }
    ]
  }
];

const LIGHTS_TABS: Tab[] = [
  {
    id: 'control',
    title: 'Quick Control',
    cards: [
      {
        id: 'main-lights',
        title: 'Main Lights',
        layout: 'verticalLayout',
        items: [
          { id: 'main-lights-device-1', type: 'device', icon: 'lightbulb', label: 'Living Room', state: true },
          { id: 'main-lights-device-2', type: 'device', icon: 'lightbulb', label: 'Kitchen', state: true },
          { id: 'main-lights-device-3', type: 'device', icon: 'lightbulb', label: 'Bedroom', state: true }
        ]
      },
      {
        id: 'accent-lights',
        title: 'Accent Lights',
        layout: 'verticalLayout',
        items: [
          { id: 'accent-lights-device-1', type: 'device', icon: 'lightbulb', label: 'Kitchen LED', state: true },
          { id: 'accent-lights-device-2', type: 'device', icon: 'lightbulb', label: 'Living Lamp', state: true },
          { id: 'accent-lights-device-3', type: 'device', icon: 'lightbulb', label: 'Bedroom Lamps', state: false }
        ]
      }
    ]
  },
  {
    id: 'rooms',
    title: 'By Room',
    cards: [
      {
        id: 'living-room-lights',
        title: 'Living Room',
        layout: 'verticalLayout',
        items: [
          { id: 'living-room-lights-device-1', type: 'device', icon: 'lightbulb', label: 'Main Light', state: true },
          { id: 'living-room-lights-device-2', type: 'device', icon: 'lightbulb', label: 'Table Lamp', state: true }
        ]
      },
      {
        id: 'kitchen-lights',
        title: 'Kitchen',
        layout: 'verticalLayout',
        items: [
          { id: 'kitchen-lights-device-1', type: 'device', icon: 'lightbulb', label: 'Ceiling Light', state: true },
          { id: 'kitchen-lights-device-2', type: 'device', icon: 'lightbulb', label: 'Under Cabinet LED', state: true }
        ]
      },
      {
        id: 'bedroom-lights',
        title: 'Bedroom',
        layout: 'verticalLayout',
        items: [
          { id: 'bedroom-lights-device-1', type: 'device', icon: 'lightbulb', label: 'Main Light', state: true },
          { id: 'bedroom-lights-device-2', type: 'device', icon: 'lightbulb', label: 'Left Lamp', state: true },
          { id: 'bedroom-lights-device-3', type: 'device', icon: 'lightbulb', label: 'Right Lamp', state: true }
        ]
      },
      {
        id: 'other-lights',
        title: 'Other Rooms',
        layout: 'verticalLayout',
        items: [
          { id: 'other-lights-device-1', type: 'device', icon: 'lightbulb', label: 'Bathroom', state: true },
          { id: 'other-lights-device-2', type: 'device', icon: 'lightbulb', label: 'Hallway', state: true }
        ]
      }
    ]
  }
];

export const MOCK_DATA = { overview: OVERVIEW_TABS, lights: LIGHTS_TABS };