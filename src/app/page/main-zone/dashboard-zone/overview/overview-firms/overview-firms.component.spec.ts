import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewFirmsComponent } from './overview-firms.component';

describe('OverviewFirmsComponent', () => {
  let component: OverviewFirmsComponent;
  let fixture: ComponentFixture<OverviewFirmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewFirmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewFirmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
