import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsBracketsComponent } from './agents-brackets.component';

describe('AgentsBracketsComponent', () => {
  let component: AgentsBracketsComponent;
  let fixture: ComponentFixture<AgentsBracketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentsBracketsComponent]
    });
    fixture = TestBed.createComponent(AgentsBracketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
