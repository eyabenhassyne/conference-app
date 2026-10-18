import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceRouteTest } from './conference-route-test';

describe('ConferenceRouteTest', () => {
  let component: ConferenceRouteTest;
  let fixture: ComponentFixture<ConferenceRouteTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceRouteTest],
    }).compileComponents();

    fixture = TestBed.createComponent(ConferenceRouteTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
