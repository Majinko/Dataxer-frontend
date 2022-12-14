import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryCostsOverview, UserMonthlyOverview, UserYearlyOverview} from '../models/overview';
import {environment} from '../../../environments/environment';
import {getHttpParams} from "../../../helper";
import {map} from "rxjs/operators";

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

  getCostsOverview(parentId: number = null, year): Observable<CategoryCostsOverview> {
    return this.http.get<CategoryCostsOverview>(`${environment.baseUrl}/overview/costsOverview?year=${year}${parentId ? `&parentId=${parentId}` : ''}`);
  }

  getReviewFinance(year): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}/overview/yearReviewFinance?year=${year}`);
  }

  paginateFilter(page: number, size: number, filter: any): Observable<any> {
    return this.http
      .get<any>(`${environment.baseUrl}/overview/usersDailyOverview?pageNumber=${page}&pageSize=${size}`, {params: getHttpParams(filter)})
      .pipe(map((times) => {
        times.content.forEach(time => {
          const date = new Date(time.dateWork);

          time.day = +(date.getUTCDate().toString() + date.getUTCMonth().toString() + date.getUTCFullYear().toString());
        });

        return times;
      }));;
  }
}
