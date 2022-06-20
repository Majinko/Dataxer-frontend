import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSupplierDialogComponent } from './item-supplier-dialog.component';

describe('ItemSupplierDialogComponent', () => {
  let component: ItemSupplierDialogComponent;
  let fixture: ComponentFixture<ItemSupplierDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSupplierDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSupplierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
