import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Cars} from '../../interfaces/cars';
import {CrudCarsOperations} from '../../shared/crudCarsOperations';
import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

export function carsStateNumberValidator(cars: Cars[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return cars.find(value => {
      return value.state_number.toUpperCase() == control.value.toUpperCase();
    }) ? {forbiddenName: {value: control.value}} : null;
  };
}

@Component({
  selector: 'app-car-info',
  templateUrl: './carInfo.component.html',
  styleUrls: ['./carInfo.component.scss']
})
export class CarInfoComponent implements OnInit {
  public cars: Cars[] = [];
  public formGroup: FormGroup | undefined;
  @Output() newCar = new EventEmitter();

  constructor(private service: CrudCarsOperations, private calendar: NgbCalendar) {
  }

  getAllData = () => {
    const sub = this.service.getCars().subscribe({
      next: value => this.cars = value,
      complete: () => {
        this.buildForm();
        sub.unsubscribe();
      }
    });
  };

  buildForm = () => {
    this.formGroup = new FormGroup({
      manufacturer: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      production_year: new FormControl('', [Validators.required, Validators.min(1990), Validators.max(this.calendar.getToday().year)]),
      state_number: new FormControl('', [Validators.required, carsStateNumberValidator(this.cars)]),
    });
  }
  generateJsonCar = (): Cars => {
    return {
      manufacturer: this.formGroup?.get('manufacturer')?.value,
      model: this.formGroup?.get('model')?.value,
      production_year: this.formGroup?.get('production_year')?.value,
      state_number: this.formGroup?.get('state_number')?.value
    } as Cars;
  }
  createCar = () => {
    const newCar = this.generateJsonCar();
    this.service.createCar(newCar).subscribe({
      next: value => this.newCar.emit(newCar.state_number),
      complete: () => {
        this.cars.push(newCar);
      }
    });
  }

  ngOnInit(): void {
    this.getAllData();
  }
}
