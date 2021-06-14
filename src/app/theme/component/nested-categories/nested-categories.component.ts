import {Component, forwardRef} from '@angular/core';
import {CategoryItemNode} from '../../../core/models/category-item-node';
import {ChecklistDatabase} from '../../../core/class/CheckListDatabase';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {CategoryItemFlatNode} from '../../../core/models/category-item-flat-node';
import {SelectionModel} from '@angular/cdk/collections';
import {ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-nested-categories',
  templateUrl: './nested-categories.component.html',
  styleUrls: ['./nested-categories.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NestedCategoriesComponent),
      multi: true
    },
    ChecklistDatabase
  ]
})
export class NestedCategoriesComponent implements ControlValueAccessor {
  /** Is finish */
  isLoadingResults: boolean = true;
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<CategoryItemFlatNode, CategoryItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<CategoryItemNode, CategoryItemFlatNode>();

  treeControl: FlatTreeControl<CategoryItemFlatNode>;

  treeFlattener: MatTreeFlattener<CategoryItemNode, CategoryItemFlatNode>;

  dataSource: MatTreeFlatDataSource<CategoryItemNode, CategoryItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<CategoryItemFlatNode>(true /* multiple */);

  formArray: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private database: ChecklistDatabase
  ) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<CategoryItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = [];
      this.dataSource.data = data;

      this.isLoadingResults = database.isLoad;
    });
  }

  getLevel = (node: CategoryItemFlatNode) => node.level;

  isExpandable = (node: CategoryItemFlatNode) => node.expandable;

  getChildren = (node: CategoryItemNode): CategoryItemNode[] => node.children;

  // tslint:disable-next-line:variable-name
  hasChild = (_: number, _nodeData: CategoryItemFlatNode) => _nodeData.expandable;

  // tslint:disable-next-line:variable-name
  hasNoContent = (_: number, _nodeData: CategoryItemFlatNode) => _nodeData.name === '';

  // on touched to it
  onTouched = () => {
  }
  // on change do it
  onChange = _ => {
  }

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: CategoryItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name ? existingNode : new CategoryItemFlatNode();
    flatNode.level = level;
    flatNode.id = node.id;
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: CategoryItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: CategoryItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: CategoryItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: CategoryItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: CategoryItemFlatNode): void {
    let parent: CategoryItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: CategoryItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: CategoryItemFlatNode): CategoryItemFlatNode | null {
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

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    console.log(value);
  }
}
