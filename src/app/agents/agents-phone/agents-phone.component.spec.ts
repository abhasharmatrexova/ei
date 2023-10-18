import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsPhoneComponent } from './agents-phone.component';

describe('AgentsPhoneComponent', () => {
  let component: AgentsPhoneComponent;
  let fixture: ComponentFixture<AgentsPhoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentsPhoneComponent]
    });
    fixture = TestBed.createComponent(AgentsPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
