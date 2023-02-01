import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCreateImagesComponent } from './cost-create-images.component';

describe('CostCreateImagesComponent', () => {
  let component: CostCreateImagesComponent;
  let fixture: ComponentFixture<CostCreateImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostCreateImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCreateImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
