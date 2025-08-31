import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device, Sensor } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private apiUrl = '/api/devices';

  constructor(private http: HttpClient) {}

  updateDeviceState(deviceId: string, newState: boolean): Observable<Device> {
    return this.http.patch<Device>(`${this.apiUrl}/${deviceId}`, { state: newState });
  }

  getDevices(): Observable<(Device | Sensor)[]> {
    return this.http.get<(Device | Sensor)[]>(this.apiUrl);
  }
}
