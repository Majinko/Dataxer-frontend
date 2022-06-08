import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProjectsComponent } from './item-projects.component';

describe('ItemProjectsComponent', () => {
  let component: ItemProjectsComponent;
  let fixture: ComponentFixture<ItemProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
