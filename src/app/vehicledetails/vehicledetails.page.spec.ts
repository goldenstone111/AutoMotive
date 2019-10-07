import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicledetailsPage } from './vehicledetails.page';

describe('VehicledetailsPage', () => {
  let component: VehicledetailsPage;
  let fixture: ComponentFixture<VehicledetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicledetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicledetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
