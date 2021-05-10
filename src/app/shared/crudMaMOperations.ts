import {Injectable} from '@angular/core';
import {ControlManufacturerAndModels} from '../interfaces/controlManufacturerAndModels';
import {CarManufacturerOrModels} from '../interfaces/carManufacturerOrModels';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CrudMaMOperations implements ControlManufacturerAndModels{
  constructor(private http: HttpClient) {
  }
  createMaM({...args}: CarManufacturerOrModels): Observable<CarManufacturerOrModels> {
    return this.http.post<CarManufacturerOrModels>('test', {...args});
  }

  deleteMaM(MaM: CarManufacturerOrModels): Observable<CarManufacturerOrModels> {
    return this.http.delete<CarManufacturerOrModels>('test');
  }

  getMaM(): Observable<CarManufacturerOrModels[]> {
    return this.http.get<CarManufacturerOrModels[]>('test');
  }
}
