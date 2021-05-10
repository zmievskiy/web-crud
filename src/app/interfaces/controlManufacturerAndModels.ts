import {Observable} from 'rxjs';
import {CarManufacturerOrModels} from './carManufacturerOrModels';

export interface ControlManufacturerAndModels{
  getMaM(): Observable<CarManufacturerOrModels[]>;
  createMaM({...args}: CarManufacturerOrModels): Observable<CarManufacturerOrModels>;
  deleteMaM(MaM: CarManufacturerOrModels): Observable<CarManufacturerOrModels>;
}
