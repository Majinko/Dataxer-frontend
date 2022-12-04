import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ProjectStartEnd, Time} from '../models/time';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Project} from '../models/project';
import {CategoryItemNode} from '../models/category-item-node';
import {DocumentFilter} from '../models/filters/document-filter';
import {map} from 'rxjs/operators';
import {IPaginate} from '../interface/IPaginate';

@Injectable({
  providedIn: 'root'
})
export class TimeService implements IPaginate<Time> {
  filter: DocumentFilter;
  rsqlFilter: string;

  constructor(private http: HttpClient) {
  }

  store(time: Time): Observable<Time> {
    return this.http.post<Time>(`${environment.baseUrl}/time/store`, time);
  }

  // todo Observable<Time[]>
  paginate(): Observable<any> {
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

  getProjectStartEnd(projectId: number): Observable<ProjectStartEnd> {
    return this.http.get<ProjectStartEnd>(`${environment.baseUrl}/time/getProjectStartEnd/${projectId}`);
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
