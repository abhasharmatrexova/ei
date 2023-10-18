import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsTourLeaderComponent } from './agents-tour-leader.component';

describe('AgentsTourLeaderComponent', () => {
  let component: AgentsTourLeaderComponent;
  let fixture: ComponentFixture<AgentsTourLeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentsTourLeaderComponent]
    });
    fixture = TestBed.createComponent(AgentsTourLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
