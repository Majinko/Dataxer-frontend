import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from '../models/role';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.baseUrl}/role/all`);
  }
}
