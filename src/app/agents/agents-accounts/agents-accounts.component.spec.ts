import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsAccountsComponent } from './agents-accounts.component';

describe('AgentsAccountsComponent', () => {
  let component: AgentsAccountsComponent;
  let fixture: ComponentFixture<AgentsAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentsAccountsComponent]
    });
    fixture = TestBed.createComponent(AgentsAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
