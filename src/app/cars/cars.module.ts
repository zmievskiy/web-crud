import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarsComponent} from './cars.component';
import {RouterModule, Routes} from '@angular/router';
import { CarInfoComponent } from './carInfo/carInfo.component';
import {ReactiveFormsModule} from '@angular/forms';
const routes: Routes = [
  {path: '', component: CarsComponent}
];

@NgModule({
  declarations: [
    CarsComponent,
    CarInfoComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ]
})
export class CarsModule { }
