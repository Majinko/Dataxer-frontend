import {Contact} from "./contact";
import {User} from "./user";

export interface Project {
  id: number;
  contact: Contact;
  user: User;
  description: string;
  title: string;
  number: string;
  state: string;
  address: string;
  area: number;
  startedAt: Date;
  finishedAt: Date;
}
