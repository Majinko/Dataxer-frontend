import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTemplatesDialogComponent } from './note-templates-dialog.component';

describe('NoteTemplatesDialogComponent', () => {
  let component: NoteTemplatesDialogComponent;
  let fixture: ComponentFixture<NoteTemplatesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteTemplatesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteTemplatesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
