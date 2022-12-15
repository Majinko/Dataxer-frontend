import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewReviewFinanceComponent } from './overview-review-finance.component';

describe('OverviewReviewFinanceComponent', () => {
  let component: OverviewReviewFinanceComponent;
  let fixture: ComponentFixture<OverviewReviewFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewReviewFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewReviewFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
