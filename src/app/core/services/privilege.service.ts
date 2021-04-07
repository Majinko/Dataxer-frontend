import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Privilege} from '../models/role';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Privilege[]> {
    return this.http.get<Privilege[]>(`${environment.baseUrl}/privilege/all`);
  }
}
