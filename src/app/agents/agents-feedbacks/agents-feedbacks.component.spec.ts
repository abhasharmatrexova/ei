import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsFeedbacksComponent } from './agents-feedbacks.component';

describe('AgentsFeedbacksComponent', () => {
  let component: AgentsFeedbacksComponent;
  let fixture: ComponentFixture<AgentsFeedbacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentsFeedbacksComponent]
    });
    fixture = TestBed.createComponent(AgentsFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
