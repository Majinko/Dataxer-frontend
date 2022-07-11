import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistShowComponent } from './todolist-show.component';

describe('TodolistShowComponent', () => {
  let component: TodolistShowComponent;
  let fixture: ComponentFixture<TodolistShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
