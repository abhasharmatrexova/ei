import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsAddComponent } from './contracts-add.component';

describe('ContractsAddComponent', () => {
  let component: ContractsAddComponent;
  let fixture: ComponentFixture<ContractsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractsAddComponent]
    });
    fixture = TestBed.createComponent(ContractsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
