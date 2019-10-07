import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciptPage } from './recipt.page';

describe('ReciptPage', () => {
  let component: ReciptPage;
  let fixture: ComponentFixture<ReciptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciptPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
