import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextMediaComponent } from './text-media.component';

describe('TextMediaComponent', () => {
  let component: TextMediaComponent;
  let fixture: ComponentFixture<TextMediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextMediaComponent]
    });
    fixture = TestBed.createComponent(TextMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
