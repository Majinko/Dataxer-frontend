import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNewSupplierDialogComponent } from './item-new-supplier-dialog.component';

describe('ItemNewSupplierDialogComponent', () => {
  let component: ItemNewSupplierDialogComponent;
  let fixture: ComponentFixture<ItemNewSupplierDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemNewSupplierDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemNewSupplierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
