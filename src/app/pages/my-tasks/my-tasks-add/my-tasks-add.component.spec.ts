import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTasksAddComponent } from './my-tasks-add.component';

describe('MyTasksAddComponent', () => {
  let component: MyTasksAddComponent;
  let fixture: ComponentFixture<MyTasksAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyTasksAddComponent]
    });
    fixture = TestBed.createComponent(MyTasksAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
