export interface CategoryItemNode {
  id?: number;
  name: string;
  depth?: number;
  position?: number;
  parentId?: number;
  parentName?: string;
  parent?: CategoryItemNode;
  children?: CategoryItemNode[];
}
