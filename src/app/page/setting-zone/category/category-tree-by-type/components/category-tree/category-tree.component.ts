import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {CategoryItemFlatNode} from '../../../../../../core/models/category-item-flat-node';
import {CategoryItemNode} from '../../../../../../core/models/category-item-node';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {SelectionModel} from '@angular/cdk/collections';
import {CategoryService} from '../../../../../../core/services/category.service';
import {MessageService} from '../../../../../../core/services/message.service';
import {CategoryHelper} from '../../../../../../core/class/CategoryHelper';
import {ChecklistDatabase} from '../../../../../../core/class/CheckListDatabase';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../../../../theme/component/confirm-dialog/confirm-dialog.component';
import firebase from "firebase";
import database = firebase.database;

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss'],
  providers: [ChecklistDatabase]
})
export class CategoryTreeComponent implements OnInit, OnChanges {
  @Input() categories: CategoryItemNode[] = [];

  /** All category load ? */
  isLoadingResults: boolean = true;
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<CategoryItemFlatNode, CategoryItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<CategoryItemNode, CategoryItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: CategoryItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  /** The new item's parent */
  newNodeParent: { id: number, name: string };

  /** The new item's id */
  newNodeId: number = null;

  /** The form was store */
  isStore: boolean = false;

  treeControl: FlatTreeControl<CategoryItemFlatNode>;

  treeFlattener: MatTreeFlattener<CategoryItemNode, CategoryItemFlatNode>;

  dataSource: MatTreeFlatDataSource<CategoryItemNode, CategoryItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<CategoryItemFlatNode>(true /* multiple */);

  /* Drag and drop */
  dragNode: any;
  dragNodeExpandOverWaitTimeMs = 300;
  dragNodeExpandOverNode: any;
  dragNodeExpandOverTime: number;
  dragNodeExpandOverArea: string;
  @ViewChild('emptyItem', {static: false}) emptyItem: ElementRef;

  constructor(
    @Inject(CategoryService) private readonly categoryService: CategoryService,
    @Inject(MessageService) private readonly messageService: MessageService,
    private categoryHelper: CategoryHelper,
    private database: ChecklistDatabase,
    public dialog: MatDialog,
  ) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<CategoryItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  ngOnInit(): void {
    this.database.dataChange.subscribe((data) => {
      this.dataSource.data = [];
      this.dataSource.data = data;

      this.isLoadingResults = false;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.database.dataChange.next(changes.categories.currentValue);
  }

  getLevel = (node: CategoryItemFlatNode) => node.level;

  isExpandable = (node: CategoryItemFlatNode) => node.expandable;

  getChildren = (node: CategoryItemNode): CategoryItemNode[] => node.children;

  hasChild = (_: number, nodeData: CategoryItemFlatNode) => nodeData.expandable;

  hasNoContent = (_: number, nodeData: CategoryItemFlatNode) => nodeData.name === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: CategoryItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name ? existingNode : new CategoryItemFlatNode();
    flatNode.id = node.id;
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.parentId = node.parentId;
    flatNode.categoryType = node.categoryType;
    flatNode.categoryGroup = node.categoryGroup;
    flatNode.expandable = (node.children && node.children.length > 0);
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: CategoryItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
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
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: CategoryItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.newNodeParent = {id: parentNode.id, name: parentNode.name};

    this.database.insertItem(parentNode, null, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: CategoryItemFlatNode, itemValue: string) {
    this.isStore = true;

    const nestedNode = this.flatNodeMap.get(node);

    this.categoryService.storeOrUpdate({name: itemValue, parentId: this.newNodeParent.id}).subscribe(category => {
      this.isStore = false;

      nestedNode.id = category.id;

      this.database.updateItem(nestedNode, itemValue);
    });
  }

  handleDragStart(event, node) {
    // Required by Firefox (https://stackoverflow.com/questions/19055264/why-doesnt-html5-drag-and-drop-work-in-firefox)
    event.dataTransfer.setData('foo', 'bar');
    event.dataTransfer.setDragImage(this.emptyItem.nativeElement, 0, 0);
    this.dragNode = node;
    this.treeControl.collapse(node);
  }

  handleDragOver(event, node) {
    event.preventDefault();

    // Handle node expand
    if (node === this.dragNodeExpandOverNode) {
      if (this.dragNode !== node && !this.treeControl.isExpanded(node)) {
        if ((new Date().getTime() - this.dragNodeExpandOverTime) > this.dragNodeExpandOverWaitTimeMs) {
          this.treeControl.expand(node);
        }
      }
    } else {
      this.dragNodeExpandOverNode = node;
      this.dragNodeExpandOverTime = new Date().getTime();
    }

    // Handle drag area
    const percentageX = event.offsetX / event.target.clientWidth;
    const percentageY = event.offsetY / event.target.clientHeight;

    if (percentageY < 0.25) {
      this.dragNodeExpandOverArea = 'above';
    } else if (percentageY > 0.75) {
      this.dragNodeExpandOverArea = 'below';
    } else {
      this.dragNodeExpandOverArea = 'center';
    }
  }

  handleDrop(event, node) {
    event.preventDefault();
    console.log(node);

    if (node !== this.dragNode) {
      let newItem: CategoryItemNode;
      if (this.dragNodeExpandOverArea === 'above') {
        newItem = this.database.copyPasteItemAbove(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
      } else if (this.dragNodeExpandOverArea === 'below') {
        newItem = this.database.copyPasteItemBelow(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
      } else {
        newItem = this.database.copyPasteItem(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
      }
      this.database.deleteItem(this.flatNodeMap.get(this.dragNode));
      this.treeControl.expandDescendants(this.nestedNodeMap.get(newItem));
    }

    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;

    this.isLoadingResults = true;

    this.categoryService.updateTree(this.dataSource.data).subscribe(() => {
      this.isLoadingResults = false;
    });
  }

  handleDragEnd(event) {
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }

  deleteNode(flatNode: CategoryItemFlatNode) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        const node = this.flatNodeMap.get(flatNode);
        this.database.deleteItem(node);

        this.categoryService.destroy(node.id).subscribe(() => {
          this.messageService.add(`Kategória ${node.name} bola zmazaná.`);
        });
      }
    });
  }
}
