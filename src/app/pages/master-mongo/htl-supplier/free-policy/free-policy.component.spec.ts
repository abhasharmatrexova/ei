import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreePolicyComponent } from './free-policy.component';

describe('FreePolicyComponent', () => {
  let component: FreePolicyComponent;
  let fixture: ComponentFixture<FreePolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreePolicyComponent]
    });
    fixture = TestBed.createComponent(FreePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
