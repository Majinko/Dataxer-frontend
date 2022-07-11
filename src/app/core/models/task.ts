import {Project} from './project';
import {CategoryItemNode} from './category-item-node';
import {User} from './user';
import {CustomFile} from './customFile';

export interface Task {
  id: number;
  project: Project;
  category: CategoryItemNode;
  user: User;
  userFrom: User;
  title: string;
  description: string;
  completion: string;
  state: string;
  finishedAt: Date;
  files?: CustomFile[];
}

export interface Todo {
  id: number;
  listId: number;
  title: string;
  checked: boolean;
  positionInList: number;
  dueDate: string;
  note: string;
  isFinished: boolean;
  assignedUser: User[];
  fromUser: User;
  notifyWhenDone: User;
  createdAt: string;
  category: CategoryItemNode;
  project: Project;
}
export interface Todolist {
  id?: number;
  title: string;
  position: number;
  createdAt: string;
  note: string;
  todos: Todo[];
  completeText: string;
  percent: number;
}

export interface TodoComment {
  id: number;
  time: string;
  name: string;
  text: string;
}
