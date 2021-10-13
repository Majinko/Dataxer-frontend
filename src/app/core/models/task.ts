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
