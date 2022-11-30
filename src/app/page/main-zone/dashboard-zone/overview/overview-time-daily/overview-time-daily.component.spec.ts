import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewTimeDailyComponent } from './overview-time-daily.component';

describe('OverviewTimeDailyComponent', () => {
  let component: OverviewTimeDailyComponent;
  let fixture: ComponentFixture<OverviewTimeDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewTimeDailyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewTimeDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
