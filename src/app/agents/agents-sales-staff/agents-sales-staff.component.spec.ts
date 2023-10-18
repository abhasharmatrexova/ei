import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsSalesStaffComponent } from './agents-sales-staff.component';

describe('AgentsSalesStaffComponent', () => {
  let component: AgentsSalesStaffComponent;
  let fixture: ComponentFixture<AgentsSalesStaffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentsSalesStaffComponent]
    });
    fixture = TestBed.createComponent(AgentsSalesStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
