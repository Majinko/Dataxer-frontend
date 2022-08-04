import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsMargeComponent } from './items-marge.component';

describe('ItemsMargeComponent', () => {
  let component: ItemsMargeComponent;
  let fixture: ComponentFixture<ItemsMargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsMargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsMargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
