import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../models/task";
import {environment} from "../../../environments/environment";
import {Paginate} from "../models/paginate";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) {
  }

  store(task: Task): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/task/store`, task)
  }

  update(task: Task): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/task/update`, task)
  }

  paginate(page: number, size: number): Observable<Paginate> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Paginate>(environment.baseUrl + `/task/paginate?page=${page}&size=${size}`);
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(environment.baseUrl + `/task/${id}`);
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(environment.baseUrl + `/task/destroy/${id}`);
  }
}
