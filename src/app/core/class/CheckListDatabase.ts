import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CategoryItemNode} from '../models/category-item-node';
import {CategoryService} from '../services/category.service';

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  isLoad: boolean = true;
  dataChange = new BehaviorSubject<CategoryItemNode[]>([]);

  get data(): CategoryItemNode[] {
    return this.dataChange.value;
  }

  constructor() {
  }

  /** Add an item to to-do list */
  insertItem(parent: CategoryItemNode, id: number, name: string, categoryType: string, categoryGroup: string): CategoryItemNode {
    if (!parent.children) {
      parent.children = [];
    }
    const newItem = {id, name, categoryType, categoryGroup} as CategoryItemNode;
    parent.children.push(newItem);
    this.dataChange.next(this.data);
    return newItem;
  }

  insertItemAbove(node: CategoryItemNode, id: number, name: string, categoryType: string, categoryGroup: string): CategoryItemNode {
    const parentNode = this.getParentFromNodes(node);
    const newItem = {id, name, categoryType, categoryGroup} as CategoryItemNode;
    if (parentNode != null) {
      parentNode.children.splice(parentNode.children.indexOf(node), 0, newItem);
    } else {
      this.data.splice(this.data.indexOf(node), 0, newItem);
    }
    this.dataChange.next(this.data);
    return newItem;
  }

  insertItemBelow(node: CategoryItemNode, id: number, name: string, categoryType: string, categoryGroup: string): CategoryItemNode {
    const parentNode = this.getParentFromNodes(node);
    const newItem = {id, name, categoryType, categoryGroup} as CategoryItemNode;
    if (parentNode != null) {
      parentNode.children.splice(parentNode.children.indexOf(node) + 1, 0, newItem);
    } else {
      this.data.splice(this.data.indexOf(node) + 1, 0, newItem);
    }
    this.dataChange.next(this.data);
    return newItem;
  }

  getParentFromNodes(node: CategoryItemNode): CategoryItemNode {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.data.length; ++i) {
      const currentRoot = this.data[i];
      const parent = this.getParent(currentRoot, node);
      if (parent != null) {
        return parent;
      }
    }
    return null;
  }

  getParent(currentRoot: CategoryItemNode, node: CategoryItemNode): CategoryItemNode {
    if (currentRoot && currentRoot.children && currentRoot.children.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < currentRoot.children.length; ++i) {
        const child = currentRoot.children[i];
        if (child === node) {
          return currentRoot;
        } else if (child && child.children && child.children.length > 0) {
          const parent = this.getParent(child, node);
          if (parent != null) {
            return parent;
          }
        }
      }
    }
    return null;
  }

  deepSearch(data: CategoryItemNode[], searchedId: number): CategoryItemNode {
    if (data) {
      return data.find((node) => {
        if (node.id === searchedId) {
          return node;
        }
        return this.deepSearch(node.children, searchedId);
      });
    }

    return null;
  }

  updateItem(node: CategoryItemNode, name: string) {
    node.name = name;
    this.dataChange.next(this.data);
  }

  deleteItem(node: CategoryItemNode) {
    this.deleteNode(this.data, node);
    this.dataChange.next(this.data);
  }

  copyPasteItem(from: CategoryItemNode, to: CategoryItemNode): CategoryItemNode {
    const newItem = this.insertItem(to, from.id, from.name, from.categoryType, from.categoryGroup);
    if (from.children) {
      from.children.forEach(child => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  copyPasteItemAbove(from: CategoryItemNode, to: CategoryItemNode): CategoryItemNode {
    const newItem = this.insertItemAbove(to, from.id, from.name, from.categoryType, from.categoryGroup);
    if (from.children) {
      from.children.forEach(child => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  copyPasteItemBelow(from: CategoryItemNode, to: CategoryItemNode): CategoryItemNode {
    const newItem = this.insertItemBelow(to, from.id, from.name, from.categoryType, from.categoryGroup);
    if (from.children) {
      from.children.forEach(child => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  deleteNode(nodes: CategoryItemNode[], nodeToDelete: CategoryItemNode) {
    const index = nodes.indexOf(nodeToDelete, 0);
    if (index > -1) {
      nodes.splice(index, 1);
    } else {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          this.deleteNode(node.children, nodeToDelete);
        }
      });
    }
  }
}
