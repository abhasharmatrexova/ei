import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsEmailsComponent } from './agents-emails.component';

describe('AgentsEmailsComponent', () => {
  let component: AgentsEmailsComponent;
  let fixture: ComponentFixture<AgentsEmailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentsEmailsComponent]
    });
    fixture = TestBed.createComponent(AgentsEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
