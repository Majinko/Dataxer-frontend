import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStateDialogComponent } from './change-state-dialog.component';

describe('ChangeStateDialogComponent', () => {
  let component: ChangeStateDialogComponent;
  let fixture: ComponentFixture<ChangeStateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeStateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeStateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
