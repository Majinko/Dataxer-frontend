import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTemplatesCreateDialogComponent } from './note-templates-create-dialog.component';

describe('NoteTemplatesCreateDialogComponent', () => {
  let component: NoteTemplatesCreateDialogComponent;
  let fixture: ComponentFixture<NoteTemplatesCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteTemplatesCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteTemplatesCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
