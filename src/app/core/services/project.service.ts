import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Paginate} from '../models/paginate';
import {environment} from '../../../environments/environment';
import {Project, ProjectEvaluation, ProjectManHours} from '../models/project';
import {map} from 'rxjs/operators';
import {CategoryItemNode} from '../models/category-item-node';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectStore = new Subject<Project>();

  constructor(private http: HttpClient) {
  }

  store(project: Project): Observable<Project> {
    return this.http.post<Project>(`${environment.baseUrl}/project/store`, project).pipe(map((p) => {
      this.projectStore.next(p);

      return p;
    }));
  }

  update(project: Project): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/project/update`, project);
  }

  all(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.baseUrl}/project/all`);
  }

  getById(id: number): Observable<Project> {
    return this.http.get<Project>(environment.baseUrl + '/project/' + id);
  }

  paginate(page: number, size: number, qs: string): Observable<Paginate<Project>> {
    let filter = '&filters=';

    if (qs) {
      ['title', 'number'].forEach(key => {
        filter += `${filter === '&filters=' ? '' : ' or '}${'project.' + key}=="${qs}*"`;
      });
    }

    // tslint:disable-next-line:max-line-length
    return this.http.get<Paginate<Project>>(environment.baseUrl + `/project/paginate?page=${page}&size=${size}${filter}`);
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/project/destroy/${id}`);
  }

  getCategories(id: number): Observable<CategoryItemNode[]> {
    return this.http.get<CategoryItemNode[]>(`${environment.baseUrl}/project/allProjectCategory?projectId=${id}`);
  }

  getProjectEvaluation(id: number, categoryId?: number): Observable<ProjectEvaluation[]> {
    return this.http.get<ProjectEvaluation[]>(`${environment.baseUrl}/project/projectCategoryOverview/${id}${categoryId ? '?categoryParent=' + categoryId : ''}`);
  }

  getProjectManHours(id: number): Observable<ProjectManHours> {
    return this.http.get<ProjectManHours>(`${environment.baseUrl}/project/projectManHours/${id}`);
  }
}
