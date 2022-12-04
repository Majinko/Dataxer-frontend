import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewHoursPriceFilterComponent } from './overview-hours-price-filter.component';

describe('OverviewHoursPriceFilterComponent', () => {
  let component: OverviewHoursPriceFilterComponent;
  let fixture: ComponentFixture<OverviewHoursPriceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewHoursPriceFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewHoursPriceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
