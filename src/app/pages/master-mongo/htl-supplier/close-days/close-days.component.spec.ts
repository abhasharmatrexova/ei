import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseDaysComponent } from './close-days.component';

describe('CloseDaysComponent', () => {
  let component: CloseDaysComponent;
  let fixture: ComponentFixture<CloseDaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseDaysComponent]
    });
    fixture = TestBed.createComponent(CloseDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
