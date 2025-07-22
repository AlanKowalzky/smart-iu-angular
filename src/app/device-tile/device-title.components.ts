<div class="device-tile" [ngClass]="{ 'device-on': device.isOn }">
  <div class="device-header">
    <h4 class="device-name">{{ device.name }}</h4>
    <span class="material-icons-outlined device-icon">{{ deviceIcon }}</span>
  </div>
  <div class="device-body">
    <p>Status: {{ device.isOn ? 'Włączone' : 'Wyłączone' }}</p>
    <p *ngIf="device.type === 'temperature_sensor'">Temperatura: {{ device.value }}°C</p>
    <p *ngIf="device.type === 'light'">Jasność: {{ device.value }}%</p>
  </div>
</div>
