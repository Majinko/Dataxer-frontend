export interface CategoryItemNode {
  id?: number;
  name: string;
  parent?: CategoryItemNode;
  children?: CategoryItemNode[];
}
