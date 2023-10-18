import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetViewComponent } from './street-view.component';

describe('StreetViewComponent', () => {
  let component: StreetViewComponent;
  let fixture: ComponentFixture<StreetViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StreetViewComponent]
    });
    fixture = TestBed.createComponent(StreetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
