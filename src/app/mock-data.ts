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
          { type: 'sensor', icon: 'thermostat', label: 'Temperature', value: { amount: 18.5, unit: '°C' } },
          { type: 'sensor', icon: 'water_drop', label: 'Humidity', value: { amount: 72, unit: '%' } },
          { type: 'sensor', icon: 'cloud', label: 'Weather', value: { amount: 1, unit: 'clear' } }
        ]
      },
      {
        id: 'living-room-lights',
        title: 'Living Room Lights',
        layout: 'horizontalLayout',
        items: [
          { type: 'device', icon: 'light', label: 'Main Light', state: true },
          { type: 'device', icon: 'light', label: 'Side Lamp', state: false }
        ]
      },
      {
        id: 'security-camera',
        title: 'Security Camera',
        layout: 'singleDevice',
        items: [
          { type: 'device', icon: 'videocam', label: 'Front Door Cam', state: true }
        ]
      }
    ]
  },
  {
    id: 'living-room',
    title: 'Living Room',
    cards: [
      {
        id: 'lr-media',
        title: 'Media Center',
        layout: 'verticalLayout',
        items: [
          { type: 'device', icon: 'tv', label: 'Television', state: true },
          { type: 'device', icon: 'speaker_group', label: 'Sound System', state: true }
        ]
      },
      {
        id: 'lr-climate',
        title: 'Climate Control',
        layout: 'horizontalLayout',
        items: [
          { type: 'sensor', icon: 'air', label: 'Air Quality', value: { amount: 95, unit: 'AQI' } },
          { type: 'device', icon: 'ac_unit', label: 'Air Conditioner', state: false }
        ]
      }
    ]
  },
  {
    id: 'kitchen',
    title: 'Kitchen',
    cards: [
      {
        id: 'kitchen-appliances',
        title: 'Appliances',
        layout: 'horizontalLayout',
        items: [
          { type: 'device', icon: 'coffee_maker', label: 'Coffee Maker', state: false },
          { type: 'device', icon: 'microwave', label: 'Microwave', state: false }
        ]
      }
    ]
  }
  ,
  {
    id: 'bedroom',
    title: 'Bedroom',
    cards: [
      {
        id: 'br-lights',
        title: 'Bedroom Lights',
        layout: 'horizontalLayout',
        items: [
          { type: 'device', icon: 'bed', label: 'Bedside Lamp', state: false },
          { type: 'device', icon: 'light', label: 'Ceiling Light', state: true }
        ]
      },
      {
        id: 'br-blinds',
        title: 'Blinds Control',
        layout: 'singleDevice',
        items: [
          { type: 'device', icon: 'blinds', label: 'Window Blinds', state: false }
        ]
      }
    ]
  },
  {
    id: 'bathroom',
    title: 'Bathroom',
    cards: [
      {
        id: 'bath-climate',
        title: 'Bathroom Climate',
        layout: 'horizontalLayout',
        items: [
          { type: 'sensor', icon: 'thermostat', label: 'Temperature', value: { amount: 22, unit: '°C' } },
          { type: 'device', icon: 'heat_pump', label: 'Heater', state: false }
        ]
      },
      {
        id: 'bath-water',
        title: 'Water Usage',
        layout: 'verticalLayout',
        items: [
          { type: 'sensor', icon: 'water', label: 'Flow Rate', value: { amount: 0, unit: 'L/min' } }
        ]
      }
    ]
  },
  {
    id: 'garage',
    title: 'Garage',
    cards: [
      {
        id: 'garage-door',
        title: 'Garage Door',
        layout: 'singleDevice',
        items: [
          { type: 'device', icon: 'garage', label: 'Main Door', state: false }
        ]
      }
    ]
  }
];