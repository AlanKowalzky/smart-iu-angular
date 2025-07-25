# 🏡 Smart Home UI – Part 1

This project is an Angular-based UI application for monitoring and controlling smart home devices. It includes a responsive layout, modular component structure, and mock data for sensors and devices.

---

## 🚀 Features

- 📊 **Dashboard view** for monitoring devices and sensors
- 💡 **Device control** (lights, sockets, switches, etc.)
- 🌡️ **Sensor display** (temperature, humidity, voltage, etc.)
- 🧩 Modular and reusable component architecture
- 📱 **Responsive sidebar**: static on desktop, collapsible on mobile
- 🔄 Group toggle switches for controlling multiple devices
- 🎨 Highlighting active devices using a **custom directive**
- 🔧 Sensor value formatting using a **custom pipe**
- 🎯 Built with **Angular 20**, SCSS, ESLint (Unicorn), and Angular Material

---

## 📦 Tech Stack

- **Angular 20**
- **Standalone components**
- **SCSS** for styling
- **Angular Material**
- **ESLint** with `eslint-plugin-unicorn`
- **TypeScript strict mode** enabled

---



---

## 🧪 Mock Data

Mock data is used to simulate devices and sensors. It defines:

- Card layout type (`single`, `horizontal`, `vertical`)
- List of sensors and devices
- Device state and sensor values

---

## 🧱 Components

### 📦 Layout

- **Sidebar** – Responsive navigation menu
- **Tab Switcher** – Switch between dashboard sections
- **Dashboard** – Main content area

### 🧩 Functional Components

- **CardList** – Displays multiple cards
- **Card** – Represents one room/zone
- **Device** – Reusable UI for controllable devices
- **Sensor** – Reusable UI for read-only sensor data

---

## 🎛️ Group Toggle Logic

If a card contains two or more controllable devices:

- The **group toggle** appears
- It is **ON** if at least one device is ON
- It is **OFF** if all devices are OFF
- Toggling it updates the state of all devices in that group

---

## 🧠 Custom Logic

### 🔅 Directives

- Custom directive to **highlight active devices or cards**

### 🔁 Pipes

- Custom pipe to format sensor value objects:
  ```ts
  { amount: 220, unit: 'W' } → "220 W"
✅ ESLint & TypeScript
ESLint configured with eslint-plugin-unicorn

no-explicit-any rule enforced

strict: true enabled in tsconfig.json

📦 Setup Instructions
1. Install dependencies

npm install
2. Run the development server

ng serve
3. Lint the project

ng lint
🧩 Requirements Summary
Feature	Status
Angular project initialized	✅
ESLint with Unicorn configured	✅
SCSS used	✅
Mock data and models defined	✅
Responsive sidebar	✅
Components generated and modular	✅
Dashboard with tab switcher	✅
Device & Sensor components	✅
Group toggle logic implemented	✅
Custom directive and pipe	✅
TypeScript strict mode	✅

📘 Next Steps (Part 2)
In the next part, the app will be connected to a backend service to fetch real sensor and device data.

📄 License
MIT © Smart Home UI Contributors