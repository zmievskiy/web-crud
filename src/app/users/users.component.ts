import {Component, OnInit} from '@angular/core';
import {CrudOperationsService} from '../shared/crudOperations.service';
import {Observable} from 'rxjs';
import {Users} from '../interfaces/users';
import {tap} from 'rxjs/operators';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users$: Observable<Users[]>;

  constructor(private service: CrudOperationsService) {
    this.users$ = service.getOwners().pipe(tap({
      next: value => console.log(value)
    }));
  }

  ngOnInit(): void {
  }
}
