import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPackTitleDialogComponent } from './document-pack-title-dialog.component';

describe('DocumentPackTitleDialogComponent', () => {
  let component: DocumentPackTitleDialogComponent;
  let fixture: ComponentFixture<DocumentPackTitleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentPackTitleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPackTitleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
