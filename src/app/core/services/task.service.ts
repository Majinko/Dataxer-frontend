import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../models/task';
import {environment} from '../../../environments/environment';
import {Paginate} from '../models/paginate';
import {CustomFile} from '../models/customFile';
import {UploadContext} from '../models/uploadContext';
import {Item} from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) {
  }

  store(task: Task, files: CustomFile[]): Observable<void> {

    const data: UploadContext<Item> = {
      files,
      object: task
    };

    return this.http.post<void>(`${environment.baseUrl}/task/store`, data);
  }

  update(task: Task): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/task/update`, task);
  }

  paginate(page: number, size: number): Observable<Paginate<Task>> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Paginate<Task>>(environment.baseUrl + `/task/paginate?page=${page}&size=${size}`);
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(environment.baseUrl + `/task/${id}`);
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(environment.baseUrl + `/task/destroy/${id}`);
  }
}
