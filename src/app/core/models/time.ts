import {Project} from './project';
import {User} from './user';
import {CategoryItemNode} from './category-item-node';

export interface Time {
  id: number;
  project: Project;
  user: User;
  category: CategoryItemNode;
  time: number;
  timeFrom: number;
  timeTo: number;
  price: number;
  description: string;
  km: number;
  day: number;
  dateWork: Date;
}
