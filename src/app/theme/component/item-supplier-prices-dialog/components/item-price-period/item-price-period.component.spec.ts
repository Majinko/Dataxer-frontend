import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPricePeriodComponent } from './item-price-period.component';

describe('ItemPricePeriodComponent', () => {
  let component: ItemPricePeriodComponent;
  let fixture: ComponentFixture<ItemPricePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPricePeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPricePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
