import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCategoryEvaluationComponent } from './project-category-evaluation.component';

describe('ProjectCategoryEvaluationComponent', () => {
  let component: ProjectCategoryEvaluationComponent;
  let fixture: ComponentFixture<ProjectCategoryEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCategoryEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCategoryEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
