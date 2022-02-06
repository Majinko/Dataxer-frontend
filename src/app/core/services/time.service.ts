import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Time} from '../models/time';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Project} from '../models/project';
import {CategoryItemNode} from '../models/category-item-node';
import {DocumentFilter} from '../models/filters/document-filter';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  filter: DocumentFilter;
  rsqlFilter: string;

  constructor(private http: HttpClient) {
  }

  store(time: Time): Observable<Time> {
    return this.http.post<Time>(`${environment.baseUrl}/time/store`, time);
  }

  allForPeriod(): Observable<Time[]> {
    return this.http.get<Time[]>(`${environment.baseUrl}/time/allForPeriod${this.rsqlFilter ? '?filters=' + this.rsqlFilter : ''}`)
      .pipe(map((times) => {
        times.forEach(time => {
          const date = new Date(time.dateWork);

          time.day = +(date.getUTCDate().toString() + date.getUTCMonth().toString() + date.getUTCFullYear().toString());
        });

        return times;
      }));
  }

  getById(id: number): Observable<Time> {
    return this.http.get<Time>(`${environment.baseUrl}/time/${id}`);
  }

  update(time: Time): Observable<Time> {
    return this.http.post<Time>(`${environment.baseUrl}/time/update`, time);
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/time/destroy/${id}`);
  }

  getLastUsersProject(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.baseUrl}/time/lastUserProjects?id=${userId}`);
  }

  getLatestProjectCategories(projectId: number): Observable<CategoryItemNode[]> {
    return this.http.get<CategoryItemNode[]>(`${environment.baseUrl}/time/lastProjectCategories?projectId=${projectId}`);
  }

  getLastUserTime(): Observable<Time> {
    return this.http.get<Time>(`${environment.baseUrl}/time/lastUserTime`);
  }

  getAllWorkYears(): Observable<number[]> {
    return this.http.get<number[]>(`${environment.baseUrl}/time/allWorkYears`);
  }

  getAllByUser(uid: string): Observable<Time[]> {
    return this.http.get<Time[]>(`${environment.baseUrl}/time/allByUser?uId=${uid}`);
  }

  getAllByProject(projectId: number, companyIds: number[] = null): Observable<Time[]> {
    return this.http.get<Time[]>(`${environment.baseUrl}/time/allByProject/${projectId}${companyIds && companyIds.length > 0 ? '?companyIds=' + companyIds : ''}`);
  }

  getAllByProjectInDetail(projectId: number): Observable<Time[]> {
    return this.http.get<Time[]>(`${environment.baseUrl}/time/allByProjectDetail/${projectId}`).pipe(map((times) => {
      times.forEach(time => {
        const date = new Date(time.dateWork);

        time.day = +(date.getUTCDate().toString() + date.getUTCMonth().toString() + date.getUTCFullYear().toString());

        // prepare user
        time.user.displayName = time.user.firstName + ' ' + time.user.lastName;
      });

      return times;
    }));
  }
}
