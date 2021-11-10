export interface CategoryItemNode {
  id?: number;
  name: string;
  depth?: number;
  position?: number;
  parentId?: number;
  parentName?: string;
  categoryType?: string;
  categoryGroup?: string;
  parent?: CategoryItemNode;
  children?: CategoryItemNode[];
}
