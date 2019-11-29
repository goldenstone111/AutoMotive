import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingmodelPage } from './trackingmodel.page';

describe('TrackingmodelPage', () => {
  let component: TrackingmodelPage;
  let fixture: ComponentFixture<TrackingmodelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingmodelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingmodelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
