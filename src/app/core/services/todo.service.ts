import { Injectable } from '@angular/core';
import {ResourceService} from '../class/ResourceService';
import {Todo} from '../models/task';
import {HttpClient} from '@angular/common/http';
import {Serializer} from '../models/serializers/Serializer';

@Injectable({
  providedIn: 'root'
})
export class TodoService extends ResourceService<Todo>  {

  constructor(
    private httpClient: HttpClient,
  ) {
    super(
      httpClient,
      'todo',
      new Serializer());
  }
}
