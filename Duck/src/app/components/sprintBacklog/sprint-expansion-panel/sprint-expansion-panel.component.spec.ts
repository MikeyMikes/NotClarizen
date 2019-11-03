import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintExpansionPanelComponent } from './sprint-expansion-panel.component';

describe('SprintExpansionPanelComponent', () => {
  let component: SprintExpansionPanelComponent;
  let fixture: ComponentFixture<SprintExpansionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintExpansionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
