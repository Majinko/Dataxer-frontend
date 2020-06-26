import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from '../models/company';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {
  }

  store(company: Company): Observable<Company> {
    return this.http.post<Company>(environment.baseUrl + '/company/store', company);
  }

  all(): Observable<Company[]> {
    return this.http.get<Company[]>(environment.baseUrl + '/company/all');
  }

  getById(companyId: number): Observable<Company> {
    return this.http.get<Company>(environment.baseUrl + '/company/' + companyId);
  }

  update(company: Company, companyId: number): Observable<Company> {
    return this.http.post<Company>(environment.baseUrl + '/company/update/' + companyId, company);
  }
}
