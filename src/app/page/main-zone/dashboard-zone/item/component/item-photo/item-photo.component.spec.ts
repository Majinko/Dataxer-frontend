import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPhotoComponent } from './item-photo.component';

describe('ItemPhotoComponent', () => {
  let component: ItemPhotoComponent;
  let fixture: ComponentFixture<ItemPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
