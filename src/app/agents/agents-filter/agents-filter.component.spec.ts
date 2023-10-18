import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsFilterComponent } from './agents-filter.component';

describe('AgentsFilterComponent', () => {
  let component: AgentsFilterComponent;
  let fixture: ComponentFixture<AgentsFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentsFilterComponent]
    });
    fixture = TestBed.createComponent(AgentsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
