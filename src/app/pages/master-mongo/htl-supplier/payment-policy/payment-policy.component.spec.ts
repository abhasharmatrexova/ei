import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPolicyComponent } from './payment-policy.component';

describe('PaymentPolicyComponent', () => {
  let component: PaymentPolicyComponent;
  let fixture: ComponentFixture<PaymentPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentPolicyComponent]
    });
    fixture = TestBed.createComponent(PaymentPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
