import {Injectable} from '@angular/core';
import {CategoryItemNode} from '../models/category-item-node';

@Injectable({
  providedIn: 'root'
})
export class CategoryHelper {
  public resetTree(items: CategoryItemNode[], list: CategoryItemNode[] = [], parentId: number = null) {
    if (items) {
      items.forEach((item, index) => {
        item.parentId = parentId;
        list.push(item);

        if (item.children) {
          const children = item.children;
          delete item.children;

          this.resetTree(children, list, item.id);
        }
      });

      return list;
    }
  }

  public prepareTree(items: CategoryItemNode[], parenId: number, parent: CategoryItemNode = null): CategoryItemNode[] {
    if (items.length > 0) {
      let i = 0;
      const tree: CategoryItemNode[] = [];

      items.forEach((item, index) => {
        if (item.parentId === parenId) {
          tree[i] = item;
          tree[i].children = this.prepareTree(items, item.id, item);

          i++;
        }
      });

      return tree;
    }
  }

  public setTreeDepth(items: CategoryItemNode[], depth: number = 0, position: number = 0) {
    if (items) {
      items.forEach(item => {
        item.position = position++;
        item.depth = depth;

        if (item.children) {
          this.setTreeDepth(item.children, depth + 1, position);
        }
      });
    }
  }

  prepareOptionTree(items: CategoryItemNode[]) {
    if (items) {
      let counter = 0;
      const tree: CategoryItemNode[] = [];

      items.forEach((item, index) => {
        const parents = items.filter(itemParent => (itemParent.id === item.parentId));


        if (parents.length) {
          const childrenCount = items.filter(itemParent => itemParent.parentId === item.id); // len ak nema element deticky tak mu nastavime parrent name

          if (childrenCount.length === 0) {
            tree[counter] = item;
            tree[counter].parentName = items.find(itemParent => itemParent.id === item.parentId).name;

            counter++;
          }
        }
      });

      return tree.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}
