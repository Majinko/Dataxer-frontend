import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeCreateComponent } from './time-create.component';

describe('TimeCreateComponent', () => {
  let component: TimeCreateComponent;
  let fixture: ComponentFixture<TimeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should price-offer-create', () => {
    expect(component).toBeTruthy();
  });
});
