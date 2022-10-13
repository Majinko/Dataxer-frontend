import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoProjectGuideComponent } from './todo-project-guide.component';

describe('TodoProjectGuideComponent', () => {
  let component: TodoProjectGuideComponent;
  let fixture: ComponentFixture<TodoProjectGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoProjectGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoProjectGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
