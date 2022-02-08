import {Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CategoryItemNode} from '../../../core/models/category-item-node';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {SelectionModel} from '@angular/cdk/collections';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CategoryHelper} from '../../../core/class/CategoryHelper';

export interface CategoryFlatNode {
  id: number;
  name: string;
  level: number;
  expandable: boolean;
  categoryGroup: string;
  categoryType: string;
  parentId: number;
}

@Component({
  selector: 'app-category-tree-control',
  templateUrl: './category-tree-control.component.html',
  styleUrls: ['./category-tree-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CategoryTreeControlComponent),
    multi: true
  }]
})
export class CategoryTreeControlComponent implements OnInit, OnChanges, ControlValueAccessor {
  categoryItemNodes: CategoryItemNode[] = [];
  cleanCategories: CategoryItemNode[] = [];

  @Input() categories: CategoryItemNode[] = [];

  transformer = (node: CategoryItemNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      id: node.id,
      name: node.name,
      parentId: node.parentId,
      categoryGroup: node.categoryGroup,
      categoryType: node.categoryType,
      level,
    };
  }
  getLevel = (node: CategoryFlatNode) => node.level;
  isExpandable = (node: CategoryFlatNode) => node.expandable;
  getChildren = (node: CategoryItemNode): CategoryItemNode[] => node.children;
  hasChild = (_: number, nodeData: CategoryFlatNode) => nodeData.expandable;
  checklistSelection = new SelectionModel<CategoryFlatNode>(true /* multiple */);

  treeControl: FlatTreeControl<CategoryFlatNode>;
  treeFlattener: MatTreeFlattener<CategoryItemNode, CategoryFlatNode>;
  dataSource: MatTreeFlatDataSource<CategoryItemNode, CategoryFlatNode>;

  constructor(
    public categoryHelper: CategoryHelper
  ) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<CategoryFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  onTouched = () => {
  }

  onChange = _ => {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.categories.currentValue.length === 0) {
      this.dataSource.data = [];
    } else {
      this.cleanCategories = changes.categories.currentValue;
      this.dataSource.data = this.categoryHelper.prepareTree(changes.categories.currentValue, null);
    }
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: CategoryFlatNode, isWrite: boolean = false): void {
    const parent: CategoryItemNode = this.cleanCategories.find(f => f.id === node.parentId);

    if (parent && !isWrite) {
      this.checklistSelection.toggle(parent as CategoryFlatNode);
      this.checkAllParentsSelection(parent as CategoryFlatNode);
    }

    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);

    if (!isWrite) {
      this.selectCategory();
    }
  }

  checkAllParentsSelection(node: CategoryFlatNode): void {
    let parent: CategoryFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  checkRootNodeSelection(node: CategoryFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  getParentNode(node: CategoryFlatNode): CategoryFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  descendantsAllSelected(node: CategoryFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });

    return descAllSelected;
  }

  descendantsPartiallySelected(node: CategoryFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  todoItemSelectionToggle(node: CategoryFlatNode, isEdit: boolean = false): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);

    this.selectCategory();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(categories: CategoryItemNode[]): void {
    if (categories) {
      categories.forEach((category) => {
        const node: CategoryFlatNode = this.treeControl.dataNodes.find(n => n.id === category.id);

        this.todoLeafItemSelectionToggle(node, true);
        this.treeControl.expand(node);
      });
    }
  }

  selectCategory() {
    this.onChange(this.checklistSelection.selected);
  }
}
