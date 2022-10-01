import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Todo, Todolist} from '../../../../../../core/models/task';
import {TodoService} from '../../../../../../core/services/todo.service';

@Component({
  selector: 'app-todos-box',
  templateUrl: './todos-box.component.html',
  styleUrls: ['./todos-box.component.scss']
})
export class TodosBoxComponent implements OnInit, OnChanges {
  createTodo = false;

  @Input() todolist: Todolist;
  todos: Todo[];
  todosFinished: Todo[];

  constructor(
    public router: Router,
    private cdr: ChangeDetectorRef,
    private todoService: TodoService,
  ) {
  }

  @Output() action: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.todos = this.todolist.todos.filter(f => f.isFinished === false);
    this.todosFinished = this.todolist.todos.filter(f => f.isFinished === true);
    this.cdr.detectChanges();
  }

  drop(event: CdkDragDrop<Todo[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    this.todolist.todos = this.todos;
    const ids = [];
    this.todolist.todos.forEach( f => {
      ids.push(f.id);
    });
    this.todoService.todoReorder(ids).subscribe(res => {
      console.log(res);
    });
  }

  checkedTodo(checked: boolean, todo: Todo) {
    this.todoService.markSolved(todo.id).subscribe(res => {
      todo.isFinished = true;
    });
  }

  addTodo($event: MouseEvent) {
    this.createTodo = true;
  }

  todoCreate($event: boolean) {
    if ($event === false) {
      this.createTodo = false;
    } else if ($event === true) {
      this.action.emit(true);
    }
  }
}
