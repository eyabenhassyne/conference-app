import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  ConferenceEdit
} from './conference-edit';

describe('ConferenceEdit', () => {

  let component:
    ConferenceEdit;

  let fixture:
    ComponentFixture<ConferenceEdit>;

  beforeEach(async () => {

    await TestBed
      .configureTestingModule({

        imports: [
          ConferenceEdit
        ]

      })
      .compileComponents();

    fixture =
      TestBed.createComponent(
        ConferenceEdit
      );

    component =
      fixture.componentInstance;

    fixture.detectChanges();

  });


  it(
    'should create',
    () => {

      expect(
        component
      ).toBeTruthy();

    }
  );

});