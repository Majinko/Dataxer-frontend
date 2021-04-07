import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Role} from '../models/role';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  reloadRoles = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.baseUrl}/role/all`);
  }

  storeOrUpdate(role: Role): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/role/storeOrUpdate`, role);
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/role/destroy/${id}`);
  }
}
