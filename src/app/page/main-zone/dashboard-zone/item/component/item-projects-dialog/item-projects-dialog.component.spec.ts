import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProjectsDialogComponent } from './item-projects-dialog.component';

describe('ItemProjectsDialogComponent', () => {
  let component: ItemProjectsDialogComponent;
  let fixture: ComponentFixture<ItemProjectsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemProjectsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProjectsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
