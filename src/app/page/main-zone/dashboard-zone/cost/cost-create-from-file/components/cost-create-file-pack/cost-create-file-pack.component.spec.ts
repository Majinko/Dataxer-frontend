import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCreateFilePackComponent } from './cost-create-file-pack.component';

describe('CostCreateFilePackComponent', () => {
  let component: CostCreateFilePackComponent;
  let fixture: ComponentFixture<CostCreateFilePackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostCreateFilePackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCreateFilePackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
