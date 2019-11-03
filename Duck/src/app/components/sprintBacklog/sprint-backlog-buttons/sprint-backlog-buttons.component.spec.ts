import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBacklogButtonsComponent } from './sprint-backlog-buttons.component';

describe('SprintBacklogButtonsComponent', () => {
  let component: SprintBacklogButtonsComponent;
  let fixture: ComponentFixture<SprintBacklogButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintBacklogButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintBacklogButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
