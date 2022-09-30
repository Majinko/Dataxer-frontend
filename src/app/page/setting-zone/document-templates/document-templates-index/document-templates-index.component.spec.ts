import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTemplatesIndexComponent } from './document-templates-index.component';

describe('DocumentTemplatesIndexComponent', () => {
  let component: DocumentTemplatesIndexComponent;
  let fixture: ComponentFixture<DocumentTemplatesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTemplatesIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTemplatesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
