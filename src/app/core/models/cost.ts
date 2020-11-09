import {Contact} from "./contact";
import {User} from "./user";
import {CategoryItemNode} from "./category-item-node";

export interface Cost {
  id: number;
  contact: Contact;
  user: User;
  title: string;
  costOrder: string;
  state: string
  type: string;
  period: string;
  price: number;
  totalPrice: number
  category: CategoryItemNode,
  isInternal: boolean;
  isRepeated: boolean;
  repeatedFrom: Date;
  repeatedTo: Date;
  nextRepeatedCost: Date;
  createdDate: Date
  dueDate: Date;
  deletedAt: Date;
}


export interface CostType{
  key: string;
  value: string;
}

export interface CostState{
  key: string;
  value: string;
}
