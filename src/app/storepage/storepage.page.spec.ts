import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorepagePage } from './storepage.page';

describe('StorepagePage', () => {
  let component: StorepagePage;
  let fixture: ComponentFixture<StorepagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorepagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
