import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomingServicesComponent } from './rooming-services.component';

describe('RoomingServicesComponent', () => {
  let component: RoomingServicesComponent;
  let fixture: ComponentFixture<RoomingServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomingServicesComponent]
    });
    fixture = TestBed.createComponent(RoomingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
