import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBacklogButtonsComponent } from './product-backlog-buttons.component';

describe('ProductBacklogButtonsComponent', () => {
  let component: ProductBacklogButtonsComponent;
  let fixture: ComponentFixture<ProductBacklogButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBacklogButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBacklogButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
