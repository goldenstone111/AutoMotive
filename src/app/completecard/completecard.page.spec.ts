import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletecardPage } from './completecard.page';

describe('CompletecardPage', () => {
  let component: CompletecardPage;
  let fixture: ComponentFixture<CompletecardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletecardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletecardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
