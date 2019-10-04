import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicalsPage } from './vehicals.page';

describe('VehicalsPage', () => {
  let component: VehicalsPage;
  let fixture: ComponentFixture<VehicalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicalsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
