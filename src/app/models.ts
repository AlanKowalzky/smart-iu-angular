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
  layout: 'singleDevice' | 'horizontalLayout' | 'verticalLayout';
  items: CardItem[];
}

export interface Tab {
  id: string;
  title: string;
  cards: Card[];
}

export interface Dashboard {
  id: string;
  title: string;
  icon: string;
  tabs: Tab[];
}

export interface DashboardData {
  tabs: Tab[];
}

export interface UserProfile {
  fullName: string;
  initials: string;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}