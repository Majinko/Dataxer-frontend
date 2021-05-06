import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Salary} from '../models/salary';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private http: HttpClient) {
  }

  getUserSalaries(uid: string, sort: string = 'asc'): Observable<Salary[]> {
    return this.http.get<Salary[]>(`${environment.baseUrl}/salary/user/${uid}?sort=${sort}`);
  }

  store(salary: Salary): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/salary/store`, salary);
  }

  update(salary: Salary): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/salary/update`, salary);
  }
}
