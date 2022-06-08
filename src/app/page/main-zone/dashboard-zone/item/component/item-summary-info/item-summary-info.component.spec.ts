import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSummaryInfoComponent } from './item-summary-info.component';

describe('ItemSummaryInfoComponent', () => {
  let component: ItemSummaryInfoComponent;
  let fixture: ComponentFixture<ItemSummaryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSummaryInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSummaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
