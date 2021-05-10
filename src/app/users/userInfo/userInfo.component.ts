import {Component, OnInit} from '@angular/core';
import {CrudOperationsService} from '../../shared/crudOperations.service';
import {Users} from '../../interfaces/users';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Cars} from '../../interfaces/cars';
import {Observable, Subscription} from 'rxjs';
import {CrudCarsOperations} from '../../shared/crudCarsOperations';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './userInfo.component.html',
  styleUrls: ['./userInfo.component.scss']
})

export class UserInfoComponent implements OnInit {
  public readonly mode: string;
  private readonly id: number;
  public carId: number | undefined;
  public cars$: Observable<Cars[]>;
  public formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    patronymic: new FormControl('', Validators.required),
  });
  public ownedCars: Cars[] = [];
  public showToast: boolean | undefined;
  public loader: boolean | undefined;


  constructor(private service: CrudOperationsService, private route: ActivatedRoute, private router: Router, private carsService: CrudCarsOperations) {
    this.mode = String(route.snapshot.params.mode);
    this.id = route.snapshot.params.id;
    this.cars$ = carsService.getCars();
  }
  ngOnInit(): void {
    this.toDoMode();
  }
  getUserInfo = () => {
    let getById: Subscription;
    getById = this.service.getOwnerById(this.id).subscribe({
      next: value => {
        this.setToForm(value);
        this.ownedCars = (value.cars as Cars[]) ? value.cars as Cars[] : [];
      },
      error: err => {
        console.error(err);
        this.router.navigateByUrl('').then(r => getById.unsubscribe());
      },
      complete: () => getById.unsubscribe()
    });
  }
  toDoMode = () => {
    switch (this.mode) {
      case 'edit':
        this.editMode();
        break;
      case 'view':
        this.viewMode();
        break;
      case 'create':
        break;
    }
  }
  viewMode = () => {
    this.getUserInfo();
    this.formGroup.disable();
  }
  editMode = () => {
    this.getUserInfo();
  }
  generateUser = (): Users => {
    return {
      id: Number(this.id),
      name: this.formGroup.get('name')?.value,
      surname: this.formGroup.get('surname')?.value,
      patronymic: this.formGroup.get('patronymic')?.value,
      cars: this.ownedCars
    };
  }
  getCarById = () => {
    this.showToast = this.checkOnDuplicates();
    if (!this.showToast) {
      this.loader = true;
      this.cars$.pipe(map(movies => movies.find(movie => movie.id == this.carId))).subscribe({
        next: (value) => this.ownedCars.push(value as Cars),
        complete: () => this.loader = false
      });
    }
  }
  checkOnDuplicates = (): boolean => {
    return !!this.ownedCars.find(car => car.id == this.carId);
  }
  updateUser = () => {
    this.service.editOwner(this.generateUser()).subscribe({
      complete: () => this.router.navigateByUrl('')
    });
  }
  createUser = () => {
    this.service.createOwner(this.generateUser()).subscribe({
      complete: () => this.router.navigateByUrl('')
    });
  }
  setToForm = (userInfo: Users) => {
    this.formGroup.get('name')?.setValue(userInfo.name);
    this.formGroup.get('surname')?.setValue(userInfo.surname);
    this.formGroup.get('patronymic')?.setValue(userInfo.patronymic);
  }
}
