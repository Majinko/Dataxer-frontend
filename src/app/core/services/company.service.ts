import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from '../models/company';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  company: Company;

  companyStore = new Subject<Company>();

  constructor(private http: HttpClient) {
  }

  store(company: Company): Observable<Company> {
    return this.http.post<Company>(environment.baseUrl + '/company/store', company).pipe(map((c) => {
      this.companyStore.next(c);

      return c;
    }));
  }

  all(): Observable<Company[]> {
    return this.http.get<Company[]>(environment.baseUrl + '/company/all');
  }

  getById(companyId: number): Observable<Company> {
    return this.http.get<Company>(environment.baseUrl + '/company/' + companyId);
  }

  update(company: Company): Observable<Company> {
    return this.http.post<Company>(environment.baseUrl + '/company/update', company);
  }

  defaultCompany(): Observable<Company> {
    return this.http.get<Company>(`${environment.baseUrl}/company/default`);
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/company/destroy/${id}`);
  }
}
