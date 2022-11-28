import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityDialogComponent } from './security-dialog.component';

describe('SecurityDialogComponent', () => {
  let component: SecurityDialogComponent;
  let fixture: ComponentFixture<SecurityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
