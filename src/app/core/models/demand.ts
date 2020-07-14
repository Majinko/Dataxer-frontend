import {CategoryItemNode} from "./category-item-node";
import {Contact} from "./contact";

export interface Demand {
  id: number;
  category?: CategoryItemNode
  client?: Contact
  title?: string;
  description?: string;
  source?: string;
  state?: string
}
