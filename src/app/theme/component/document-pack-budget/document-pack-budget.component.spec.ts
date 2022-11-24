import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPackBudgetComponent } from './document-pack-budget.component';

describe('DocumentPackBudgetComponent', () => {
  let component: DocumentPackBudgetComponent;
  let fixture: ComponentFixture<DocumentPackBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentPackBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPackBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
