import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTeamButtonsComponent } from './manage-team-buttons.component';

describe('ManageTeamButtonsComponent', () => {
  let component: ManageTeamButtonsComponent;
  let fixture: ComponentFixture<ManageTeamButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTeamButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTeamButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
