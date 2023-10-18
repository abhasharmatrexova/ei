import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsPaymentConditionsComponent } from './agents-payment-conditions.component';

describe('AgentsPaymentConditionsComponent', () => {
  let component: AgentsPaymentConditionsComponent;
  let fixture: ComponentFixture<AgentsPaymentConditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentsPaymentConditionsComponent]
    });
    fixture = TestBed.createComponent(AgentsPaymentConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
