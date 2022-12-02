export interface CategoryItemNode {
  id?: number;
  name: string;
  depth?: number;
  position?: number;
  parentId?: number;
  parentName?: string;
  categoryType?: string;
  categoryGroup?: string;
  isDeactivated?: boolean;
  parent?: CategoryItemNode;
  children?: CategoryItemNode[];
}

export interface CategoryItemNodeDemand extends CategoryItemNode {
  showName: boolean;
  showPerson: boolean;
}

export interface CategoryItemNodeWithSharedCategory extends CategoryItemNode {
  sharedCategory: CategoryItemNodeDemand;
}

export interface ProjectCategoriesMap {
  showName: boolean;
  showPerson: boolean;

  category: CategoryItemNode;
  categoryPared: CategoryItemNode;
}
