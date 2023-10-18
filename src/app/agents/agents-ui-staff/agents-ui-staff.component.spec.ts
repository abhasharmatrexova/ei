import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsUiStaffComponent } from './agents-ui-staff.component';

describe('AgentsUiStaffComponent', () => {
  let component: AgentsUiStaffComponent;
  let fixture: ComponentFixture<AgentsUiStaffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentsUiStaffComponent]
    });
    fixture = TestBed.createComponent(AgentsUiStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
