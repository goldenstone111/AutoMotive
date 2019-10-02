import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprofilepicPage } from './addprofilepic.page';

describe('AddprofilepicPage', () => {
  let component: AddprofilepicPage;
  let fixture: ComponentFixture<AddprofilepicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprofilepicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprofilepicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
