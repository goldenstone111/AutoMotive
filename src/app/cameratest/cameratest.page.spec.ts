import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameratestPage } from './cameratest.page';

describe('CameratestPage', () => {
  let component: CameratestPage;
  let fixture: ComponentFixture<CameratestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameratestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameratestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
