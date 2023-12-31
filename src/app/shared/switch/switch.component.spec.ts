import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchsComponent } from './switch.component';

describe('SwitchsComponent', () => {
  let component: SwitchsComponent;
  let fixture: ComponentFixture<SwitchsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwitchsComponent]
    });
    fixture = TestBed.createComponent(SwitchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
