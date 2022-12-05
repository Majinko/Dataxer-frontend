import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTimeFilterComponent } from './project-time-filter.component';

describe('ProjectTimeFilterComponent', () => {
  let component: ProjectTimeFilterComponent;
  let fixture: ComponentFixture<ProjectTimeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTimeFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTimeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
