import {Task} from '../task';

export class TaskSerializer {
  fromJson(json: any): Task {
    return json as Task;
  }

  toJson(task: Task): Task {
    return task;
  }
}
