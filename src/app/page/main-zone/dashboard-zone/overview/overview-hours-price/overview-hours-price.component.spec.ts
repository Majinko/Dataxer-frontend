import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewHoursPriceComponent } from './overview-hours-price.component';

describe('OverviewHoursPriceComponent', () => {
  let component: OverviewHoursPriceComponent;
  let fixture: ComponentFixture<OverviewHoursPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewHoursPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewHoursPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
