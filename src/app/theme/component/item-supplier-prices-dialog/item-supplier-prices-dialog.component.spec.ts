import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSupplierPricesDialogComponent } from './item-supplier-prices-dialog.component';

describe('ItemSupplierPricesDialogComponent', () => {
  let component: ItemSupplierPricesDialogComponent;
  let fixture: ComponentFixture<ItemSupplierPricesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSupplierPricesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSupplierPricesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
