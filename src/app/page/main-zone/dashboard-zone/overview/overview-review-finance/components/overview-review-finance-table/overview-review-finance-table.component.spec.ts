import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewReviewFinanceTableComponent } from './overview-review-finance-table.component';

describe('OverviewReviewFinanceTableComponent', () => {
  let component: OverviewReviewFinanceTableComponent;
  let fixture: ComponentFixture<OverviewReviewFinanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewReviewFinanceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewReviewFinanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
