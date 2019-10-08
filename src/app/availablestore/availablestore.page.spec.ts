import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablestorePage } from './availablestore.page';

describe('AvailablestorePage', () => {
  let component: AvailablestorePage;
  let fixture: ComponentFixture<AvailablestorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailablestorePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablestorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
