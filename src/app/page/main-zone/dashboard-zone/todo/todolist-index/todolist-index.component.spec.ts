import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistIndexComponent } from './todolist-index.component';

describe('TodolistIndexComponent', () => {
  let component: TodolistIndexComponent;
  let fixture: ComponentFixture<TodolistIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
