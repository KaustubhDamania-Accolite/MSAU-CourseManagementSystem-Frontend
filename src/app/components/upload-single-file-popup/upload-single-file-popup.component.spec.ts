import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSingleFilePopupComponent } from './upload-single-file-popup.component';

describe('UploadSingleFilePopupComponent', () => {
  let component: UploadSingleFilePopupComponent;
  let fixture: ComponentFixture<UploadSingleFilePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSingleFilePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSingleFilePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
