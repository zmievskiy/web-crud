import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Cars} from '../interfaces/cars';
import {CrudCarsOperations} from '../shared/crudCarsOperations';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  public cars$: Observable<Cars[]>;
  constructor(private service: CrudCarsOperations) {
    this.cars$ = service.getCars();
  }
  updateList = (event: any) => {
    this.cars$ = this.service.getCars();
  }
  ngOnInit(): void {
  }

}
