export interface CategoryItemNode {
  id?: number;
  name: string;
  parentId?: number;
  parent?: CategoryItemNode;
  children?: CategoryItemNode[];
}
