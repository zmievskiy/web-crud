import {Observable} from 'rxjs';
import {Cars} from './cars';

export interface ControlCars {
  createCar(car: Cars): Observable<Cars>;
  getCars(): Observable<Cars[]>;
}
