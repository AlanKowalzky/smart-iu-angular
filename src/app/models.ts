export interface SensorValue {
  amount: number;
  unit: string;
}

export interface BaseItem {
  type: 'sensor' | 'device';
  icon: string;
  label: string;
}

export interface Sensor extends BaseItem {
  type: 'sensor';
  value: SensorValue;
}

export interface Device extends BaseItem {
  type: 'device';
  state: boolean;
}

export type CardItem = Sensor | Device;

export interface Card {
  id: string;
  title: string;
  layout: 'horizontalLayout' | 'verticalLayout' | 'singleDevice';
  items: CardItem[];
}

export interface Tab {
  id: string;
  title: string;
  cards: Card[];
}
