import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Users} from '../interfaces/users';
import {Cars} from '../interfaces/cars';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDSService implements InMemoryDbService {

  constructor() {
  }

  createDb(): {} {
    const users: Users[] = [];
    const cars: Cars[] = [
      {
        manufacturer: 'Ilon',
        model: 'Tesla',
        production_year: 1990,
        state_number: '123',
        id: 1
      }
    ];
    return {users, cars};
  }

  genId(users: Users[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
