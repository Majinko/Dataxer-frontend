import {Injectable} from '@angular/core';
import {ResourceService} from '../class/ResourceService';
import {Todo, TodoComment, Todolist} from '../models/task';
import {HttpClient} from '@angular/common/http';
import {Serializer} from '../models/serializers/Serializer';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService extends ResourceService<Todo> {

  constructor(
    private httpClient: HttpClient,
  ) {
    super(
      httpClient,
      'todo',
      new Serializer());
  }

  storeTodoList(todolist: Todolist): Observable<Todolist> {
    return this.httpClient.post<Todolist>(`${environment.baseUrl}/todo/storeTodoList`, todolist);
  }

  listReorder(ids: number[]): Observable<Todolist[]> {
    return this.httpClient.get<Todolist[]>(`${environment.baseUrl}/todo/listReorder?ids=${ids}`);
  }

  todoReorder(ids: number[]): Observable<Todolist> {
    return this.httpClient.get<Todolist>(`${environment.baseUrl}/todo/todoReorder?todoIds=${ids}`);
  }

  updateTodoList(todolist: Todolist): Observable<Todolist> {
    return this.httpClient.post<Todolist>(`${environment.baseUrl}/todo/updateTodoList`, todolist);
  }

  storeTodo(id: number, todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(`${environment.baseUrl}/todo/storeTodo/${id}`, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(`${environment.baseUrl}/todo/updateTodo/`, todo);
  }

  allTodoList(projectId: number): Observable<Todolist[]> {
    return this.httpClient.get<Todolist[]>(`${environment.baseUrl}/todo/allTodoList/${projectId}`);
  }

  todoListById(id: number): Observable<Todolist> {
    return this.httpClient.get<Todolist>(`${environment.baseUrl}/todo/todolist/${id}`);
  }

  todoById(id: number): Observable<Todo> {
    return this.httpClient.get<Todo>(`${environment.baseUrl}/todo/todoById/${id}`);
  }

  markSolved(id: number): Observable<Todo> {
    return this.httpClient.get<Todo>(`${environment.baseUrl}/todo/markSolved/${id}`);
  }

  todoMessages(id: number, type: string): Observable<TodoComment[]> {
    return this.httpClient.get<TodoComment[]>(`${environment.baseUrl}/todoMessage/all/${id}/${type}`);
  }

  storeMessage(message: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/todoMessage/store`, message);
  }

  groupByProject() {
    return this.httpClient.get<any>(`${environment.baseUrl}/todo/groupByProject`);
  }
}
