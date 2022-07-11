import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPieChartComponent } from './todo-pie-chart.component';

describe('TodoPieChartComponent', () => {
  let component: TodoPieChartComponent;
  let fixture: ComponentFixture<TodoPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
