import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudibaseIframeComponent } from './budibase-iframe.component';

describe('BudibaseIframeComponent', () => {
  let component: BudibaseIframeComponent;
  let fixture: ComponentFixture<BudibaseIframeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudibaseIframeComponent]
    });
    fixture = TestBed.createComponent(BudibaseIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
