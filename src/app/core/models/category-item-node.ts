export interface CategoryItemNode {
  id?: number;
  name: string;
  depth?: number;
  position?: number;
  parentId?: number;
  parent?: CategoryItemNode;
  children?: CategoryItemNode[];
}
