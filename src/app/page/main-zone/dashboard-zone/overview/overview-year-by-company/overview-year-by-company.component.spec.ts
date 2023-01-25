import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewYearByCompanyComponent } from './overview-year-by-company.component';

describe('OverviewYearByCompanyComponent', () => {
  let component: OverviewYearByCompanyComponent;
  let fixture: ComponentFixture<OverviewYearByCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewYearByCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewYearByCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
