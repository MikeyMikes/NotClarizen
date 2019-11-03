import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasktableComponent } from './tasktable.component';

describe('TasktableComponent', () => {
  let component: TasktableComponent;
  let fixture: ComponentFixture<TasktableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasktableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasktableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
