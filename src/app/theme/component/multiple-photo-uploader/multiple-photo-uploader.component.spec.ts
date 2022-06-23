import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplePhotoUploaderComponent } from './multiple-photo-uploader.component';

describe('MultiplePhotoUploaderComponent', () => {
  let component: MultiplePhotoUploaderComponent;
  let fixture: ComponentFixture<MultiplePhotoUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplePhotoUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplePhotoUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
