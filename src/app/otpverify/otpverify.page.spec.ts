import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpverifyPage } from './otpverify.page';

describe('OtpverifyPage', () => {
  let component: OtpverifyPage;
  let fixture: ComponentFixture<OtpverifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpverifyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpverifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
