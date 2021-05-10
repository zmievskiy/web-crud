import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from './users/users.component';
import {UserInfoComponent} from './users/userInfo/userInfo.component';

const routes: Routes = [
  {path: '', component: UsersComponent},
  {path: 'user/:mode/:id', component: UserInfoComponent},
  {path: 'user/:mode', component: UserInfoComponent},
  {
    path: 'cars',
    loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule)
  },
  {path: '**', component: UsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
