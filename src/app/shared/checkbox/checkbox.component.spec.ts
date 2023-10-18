import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxsComponent } from './checkbox.component';

describe('CheckboxsComponent', () => {
  let component: CheckboxsComponent;
  let fixture: ComponentFixture<CheckboxsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxsComponent]
    });
    fixture = TestBed.createComponent(CheckboxsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
