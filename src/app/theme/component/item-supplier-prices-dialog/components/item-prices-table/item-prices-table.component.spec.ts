import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPricesTableComponent } from './item-prices-table.component';

describe('ItemPricesTableComponent', () => {
  let component: ItemPricesTableComponent;
  let fixture: ComponentFixture<ItemPricesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPricesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPricesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
