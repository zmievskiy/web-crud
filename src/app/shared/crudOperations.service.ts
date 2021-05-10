import {Injectable} from '@angular/core';
import {ICarOwnersService} from '../interfaces/iCarOwnersService';
import {Users} from '../interfaces/users';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudOperationsService implements ICarOwnersService {
  url = 'api/users/';

  constructor(private http: HttpClient) {
  }

  createOwner({...args}: Users): Observable<Users> {
    return this.http.post<Users>(this.url, {...args});
  }

  deleteOwner(input: Users): Observable<Users> {
    return this.http.delete<Users>(this.url);
  }

  editOwner(input: Users): Observable<Users> {
    return this.http.put<Users>(this.url, input);
  }

  getOwnerById(id: number): Observable<Users> {
    return this.http.get<Users>(this.url + id);
  }

  getOwners(): Observable<Users[]> {
    return this.http.get<Users[]>(this.url);
  }

}
