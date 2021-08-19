import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuLogoComponent } from './menu-logo.component';

describe('LogoComponent', () => {
  let component: MenuLogoComponent;
  let fixture: ComponentFixture<MenuLogoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should price-offer-create', () => {
    expect(component).toBeTruthy();
  });
});
