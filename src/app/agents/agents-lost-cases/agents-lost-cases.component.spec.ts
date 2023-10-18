import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsLostCasesComponent } from './agents-lost-cases.component';

describe('AgentsLostCasesComponent', () => {
  let component: AgentsLostCasesComponent;
  let fixture: ComponentFixture<AgentsLostCasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentsLostCasesComponent]
    });
    fixture = TestBed.createComponent(AgentsLostCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
