/** Flat to-do item node with expandable and level information */
export class CategoryItemFlatNode {
  id: number;
  name: string;
  level: number;
  parentId: number;
  expandable: boolean;
  categoryType: string;
  categoryGroup: string;
  isDeactivated?: boolean;
}
