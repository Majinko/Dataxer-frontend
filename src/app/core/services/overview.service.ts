import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryCostsOverview, UserMonthlyOverview, UserYearlyOverview} from '../models/overview';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor(private http: HttpClient) {
  }

  getUsersMonthlyOverview(from: string, to: string): Observable<UserMonthlyOverview[]> {
    return this.http.get<UserMonthlyOverview[]>(`${environment.baseUrl}/overview/usersHoursOverview?fromDate=${from}&toDate=${to}`);
  }

  getUsersYearlyOverview(): Observable<UserYearlyOverview[]> {
    return this.http.get<UserYearlyOverview[]>(`${environment.baseUrl}/overview/userYearsOverview`);
  }

  getCostsOverview(): Observable<CategoryCostsOverview>{
    return this.http.get<CategoryCostsOverview>(`${environment.baseUrl}/overview/costsOverview?year=2021`);
  }
}
