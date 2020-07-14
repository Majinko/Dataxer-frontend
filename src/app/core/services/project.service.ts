import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Paginate} from "../models/paginate";
import {environment} from "../../../environments/environment";
import {Project} from "../models/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  store(project: Project): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/project/store`, project)
  }

  update(project: Project): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/project/update`, project)
  }

  getById(id: number): Observable<Project>{
    return this.http.get<Project>(environment.baseUrl + '/project/' + id);
  }

  paginate(page: number, size: number): Observable<Paginate> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Paginate>(environment.baseUrl + `/project/paginate?page=${page}&size=${size}`);
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(environment.baseUrl + '/project/destroy/' + id);
  }
}
