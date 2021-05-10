import {Injectable} from '@angular/core';
import {ControlCars} from '../interfaces/controlCars';
import {Observable} from 'rxjs';
import {Cars} from '../interfaces/cars';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class CrudCarsOperations implements ControlCars {
  constructor(private http: HttpClient) {
  }

  url = 'api/cars/';

  createCar(car: Cars): Observable<Cars> {
    return this.http.post<Cars>(this.url, car);
  }

  getCars(): Observable<Cars[]> {
    return this.http.get<Cars[]>(this.url);
  }
}
