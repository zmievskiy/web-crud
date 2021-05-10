import {Observable} from 'rxjs';
import {Users} from './users';

export interface ICarOwnersService{
  getOwners(): Observable<Users[]>;
  getOwnerById(id: number): Observable<Users>;
  createOwner({...args}: Users): Observable<Users>;
  editOwner(input: Users): Observable<Users>;
  deleteOwner(input: Users): Observable<Users>;
}
