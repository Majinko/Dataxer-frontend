import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginateFilterComponent } from './paginate-filter.component';

describe('PaginateFilterComponent', () => {
  let component: PaginateFilterComponent;
  let fixture: ComponentFixture<PaginateFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginateFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
