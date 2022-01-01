import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Salary} from '../models/salary';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  storeOrUpdate = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  getActiveUserSalary(uid: string): Observable<Salary> {
    let params = new HttpParams();

    params = params.set('uid', uid);

    return this.http.get<Salary>(`${environment.baseUrl}/salary/userActiveSalary`, {params});
  }

  getUserSalaries(uid: string, sort: string = 'asc'): Observable<Salary[]> {
    return this.http.get<Salary[]>(`${environment.baseUrl}/salary/user/${uid}?sort=${sort}`);
  }

  store(salary: Salary): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/salary/store`, salary).pipe(map(() => {
      this.storeOrUpdate.next(true);
    }));
  }

  update(salary: Salary): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/salary/update`, salary).pipe(map(() => {
      this.storeOrUpdate.next(true);
    }));
  }
}
