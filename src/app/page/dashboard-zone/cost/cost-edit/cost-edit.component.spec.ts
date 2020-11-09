/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CostEditComponent } from './cost-edit.component';

describe('CostEditComponent', () => {
  let component: CostEditComponent;
  let fixture: ComponentFixture<CostEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
