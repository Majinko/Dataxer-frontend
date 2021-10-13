import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../models/task';
import {environment} from '../../../environments/environment';
import {CustomFile} from '../models/customFile';
import {UploadContext} from '../models/uploadContext';
import {Item} from '../models/item';
import {ResourceService} from '../class/ResourceService';
import {map} from 'rxjs/operators';
import {TaskSerializer} from '../models/serializers/taskSerializer';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends ResourceService<Task> {

  constructor(private httpClient: HttpClient) {
    super(
      httpClient,
      'task',
      new TaskSerializer());
  }

  storeWithFiles(task: Task, files: CustomFile[]): Observable<void> {

    const data: UploadContext<Item> = {
      files,
      object: task
    };

    return this.httpClient.post<void>(`${environment.baseUrl}/task/store`, data);
  }

  update(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${environment.baseUrl}/task/update`, task);
  }


  getById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(environment.baseUrl + `/task/${id}`).pipe(map((task) => {
      task.user.displayName = task.user.firstName + ' ' + task.user.lastName;
      task.userFrom.displayName = task.userFrom.firstName + ' ' + task.userFrom.lastName;

      return task;
    }));
  }

  destroy(id: number): Observable<void> {
    return this.httpClient.get<void>(environment.baseUrl + `/task/destroy/${id}`);
  }
}
