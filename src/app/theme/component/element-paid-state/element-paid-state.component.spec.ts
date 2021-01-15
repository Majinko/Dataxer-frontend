import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementPaidStateComponent } from './element-paid-state.component';

describe('ElementPaidStateComponent', () => {
  let component: ElementPaidStateComponent;
  let fixture: ComponentFixture<ElementPaidStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementPaidStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementPaidStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
