import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosBoxComponent } from './todos-box.component';

describe('TodosBoxComponent', () => {
  let component: TodosBoxComponent;
  let fixture: ComponentFixture<TodosBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
