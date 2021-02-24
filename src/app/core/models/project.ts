import {Contact} from './contact';
import {User} from './user';
import {CategoryItemNode} from './category-item-node';

export interface Project {
  id: number;
  description: string;
  title: string;
  number: string;
  state: string;
  address: string;
  area: number;
  startedAt: Date;
  finishedAt: Date;

  contact: Contact;
  user: User;
  categories: CategoryItemNode[];
}
