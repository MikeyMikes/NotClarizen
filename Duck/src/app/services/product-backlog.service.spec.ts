import { TestBed } from '@angular/core/testing';

import { ProductBacklogService } from './product-backlog.service';

describe('ProductBacklogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductBacklogService = TestBed.get(ProductBacklogService);
    expect(service).toBeTruthy();
  });
});
